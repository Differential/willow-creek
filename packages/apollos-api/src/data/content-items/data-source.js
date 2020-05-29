import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';
import { flatten, get, uniq } from 'lodash';
import Color from 'color';
import { createGlobalId, parseGlobalId } from '@apollosproject/server-core';

const { ROCK_MAPPINGS } = ApollosConfig;

class ExtendedContentItem extends ContentItem.dataSource {
  expanded = true;

  DEFAULT_SORT = () => [
    { field: 'Priority', direction: 'asc' },
    { field: 'StartDateTime', direction: 'asc' },
  ];

  // A cursor returning content items by a guid.
  // Returns a more inclusive cursor if no guid is passed.

  createSummary = ({ attributeValues }) => {
    const summary = get(attributeValues, 'summary.value', '');
    if (summary !== '') return summary;
    return '';
  };

  async getCoverImage(root) {
    const pickBestImage = (images) => {
      // TODO: there's probably a _much_ more explicit and better way to handle this
      const squareImage = images.find((image) =>
        image.key.toLowerCase().includes('square')
      );
      if (squareImage) return { ...squareImage, __typename: 'ImageMedia' };
      return { ...images[0], __typename: 'ImageMedia' };
    };

    const withSources = (image) => image.sources.length;

    let image;

    const { Cache } = this.context.dataSources;
    const cachedValue = await Cache.get({
      key: `contentItem-coverImage-${root.id}`,
    });

    if (cachedValue) {
      return cachedValue;
    }
    // filter images w/o URLs
    const ourImages = this.getImages(root).filter(withSources);

    if (ourImages.length) image = pickBestImage(ourImages);

    if (!image) {
      if (get(root, 'attributeValues.youtubeId.value', '') !== '') {
        const result = await this.context.dataSources.Youtube.getFromId(
          root.attributeValues.youtubeId.value
        );

        if (!result || !result.snippet) return null;
        const { snippet } = result;

        const availableSources = Object.keys(snippet.thumbnails).map((key) => ({
          uri: snippet.thumbnails[key].url,
          width: snippet.thumbnails[key].width,
        }));

        const source = availableSources.sort((a, b) => b.width - a.width)[0];

        image = {
          __typename: 'ImageMedia',
          sources: [source],
        };
      }
    }

    if (!image) {
      // If no image, check parent for image:
      const parentItemsCursor = await this.getCursorByChildContentItemId(
        root.id
      );
      if (!parentItemsCursor) return null;

      const parentItems = await parentItemsCursor.get();

      if (parentItems.length) {
        const parentImages = flatten(parentItems.map(this.getImages));
        const validParentImages = parentImages.filter(withSources);

        if (validParentImages && validParentImages.length)
          image = pickBestImage(validParentImages);
      }
    }

    if (image != null) {
      Cache.set({ key: `contentItem-coverImage-${root.id}`, data: image });
    }
    return image;
  }

  async getTheme(root) {
    const {
      id,
      attributeValues: { themeColor },
    } = root;
    const primary = get(themeColor, 'value');

    const theme = {
      type: 'DARK',
      colors: {
        primary,
      },
    };

    if (!primary && id) {
      const parentItemsCursor = await this.getCursorByChildContentItemId(id);
      if (parentItemsCursor) {
        const parentItems = await parentItemsCursor.get();
        if (parentItems.length) {
          const parentPrimaryColors = flatten(
            parentItems.map((i) => get(i, 'attributeValues.themeColor.value'))
          ).filter((v) => v);
          if (parentPrimaryColors && parentPrimaryColors.length)
            [theme.colors.primary] = parentPrimaryColors;
        }
      }
    }

    // if there's still no primary color set in the CMS, we want to return a null theme so that
    // the front end uses its default theme:
    if (!theme.colors.primary) return null;
    theme.type =
      Color(theme.colors.primary).luminosity() > 0.5 ? 'LIGHT' : 'DARK';

    return theme;
  }

  bySearchableContent = () =>
    this.request()
      .cache({ ttl: 60 })
      .andFilter(this.LIVE_CONTENT());

  byUserCampus = async ({ contentChannelIds = [], fallback }) => {
    const { Person } = this.context.dataSources;

    const { campusGuid } = await Person.getCurrentUserCampusId();

    if (!campusGuid) {
      // No campus or no current user.
      if (fallback) {
        return fallback();
      }
      return this.request().empty();
    }

    // Return data matching just their campus
    const cursor = this.request(
      `Apollos/ContentChannelItemsByAttributeValue?attributeKey=Campus&attributeValues=${campusGuid}`
    );

    if (contentChannelIds.length !== 0) {
      cursor.filterOneOf(
        contentChannelIds.map((id) => `ContentChannelId eq ${id}`)
      );
    }

    return cursor
      .andFilter(this.LIVE_CONTENT())
      .orderBy('StartDateTime', 'desc');
  };

  async byPersonaFeedAndCampus({ contentChannelIds = [], first = 3 }) {
    const { Person } = this.context.dataSources;

    const userPersonas = await Person.getPersonas({
      categoryId: ApollosConfig.ROCK_MAPPINGS.DATAVIEW_CATEGORIES.PersonaId,
    });

    if (userPersonas.length === 0) {
      return this.byUserCampus({ contentChannelIds });
    }

    const { campusId } = await Person.getCurrentUserCampusId();

    if (!campusId) {
      return this.request().empty();
    }

    const cursor = this.request(
      `Apollos/ContentChannelItemsByCampusIdAndAttributeValue?campusId=${campusId}&attributeKey=Personas&attributeValues=${userPersonas
        .map(({ guid }) => guid)
        .join(',')}`
    );

    if (contentChannelIds.length !== 0) {
      cursor.filterOneOf(
        contentChannelIds.map((id) => `ContentChannelId eq ${id}`)
      );
    }

    return cursor
      .andFilter(this.LIVE_CONTENT())
      .orderBy('StartDateTime', 'desc')
      .top(first);
  }

  byUserFeed() {
    return this.byUserCampus({
      contentChannelIds: ApollosConfig.ROCK_MAPPINGS.FEED_CONTENT_CHANNEL_IDS,
    });
  }

  getActiveLiveStreamContent = async () => {
    const { LiveStream } = this.context.dataSources;
    const { isLive } = await LiveStream.getLiveStream();
    // if there is no live stream, then there is no live content. Easy enough!
    if (!isLive) return [];

    const mostRecentSermon = await (await this.byUserCampus({
      contentChannelIds: [16],
    })).first();
    return [mostRecentSermon];
  };

  async getSeriesWithUserProgress() {
    const { Auth, Interactions } = this.context.dataSources;

    // Safely exit if we don't have a current user.
    try {
      await Auth.getCurrentPerson();
    } catch (e) {
      return this.request().empty();
    }

    const interactions = await Interactions.getInteractionsForCurrentUser({
      actions: ['SERIES_START'],
    });

    const ids = uniq(
      interactions.map(({ foreignKey }) => {
        const { id } = parseGlobalId(foreignKey);
        return id;
      })
    );

    // We need to make sure we don't include the campaign channels.
    // We could also consider doing this using a whitelist.
    // This also may be part of a broader conversation about how we identify the true parent of a content item
    const blacklistedIds = (await this.byContentChannelIds(
      ROCK_MAPPINGS.CAMPAIGN_CHANNEL_IDS
    ).get()).map(({ id }) => `${id}`);

    const completedIds = (await Promise.all(
      ids.map(async (id) => ({
        id,
        lastComplete: await this.getLastChildComplete({ id }),
      }))
    ))
      .filter(({ lastComplete }) => lastComplete === true)
      .map(({ id }) => id);

    const finalIds = ids.filter(
      (id) => ![...blacklistedIds, ...completedIds].includes(id)
    );

    return this.getFromIds(finalIds);
  }

  async getLastChildComplete({ id }) {
    const lastChild = await (await this.getCursorByParentContentItemId(id))
      .sort([
        { field: 'Priority', direction: 'desc' },
        { field: 'StartDateTime', direction: 'desc' },
      ])
      .first();
    if (!lastChild) {
      return true;
    }
    const completedInteractions = await this.context.dataSources.Interactions.getInteractionsForCurrentUserAndNodes(
      {
        nodeIds: [createGlobalId(lastChild.id, this.resolveType(lastChild))],
        actions: ['COMPLETE'],
      }
    );
    return !!completedInteractions.length;
  }

  resolveType(attrs, ...otherProps) {
    const { contentChannelId } = attrs;
    if (
      ApollosConfig.ROCK_MAPPINGS.CONTENT_ITEM.WeekendContentItem.ContentChannelId.includes(
        contentChannelId
      )
    ) {
      return 'WeekendContentItem';
    }

    if (get(attrs, 'attributeValues.youtubeId.value', '') !== '') {
      return 'WillowTVContentItem';
    }
    return super.resolveType(attrs, ...otherProps);
  }

  getShareUrl = async ({ id, ...args }) => {
    const __typename = this.resolveType({ id, ...args });
    return `${
      ApollosConfig.ROCK.SHARE_URL
    }/app-link/ContentSingle?itemId=${createGlobalId(id, __typename)}`;
  };
}

export default ExtendedContentItem;
