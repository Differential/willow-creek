import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';
import { flatten, get, uniq } from 'lodash';

class ExtendedContentItem extends ContentItem.dataSource {
  expanded = true;

  // A cursor returning content items by a guid.
  // Returns a more inclusive cursor if no guid is passed.

  async getCoverImage(root) {
    const { Cache } = this.context.dataSources;
    const cachedValue = await Cache.get({
      key: `contentItem-coverImage-${root.id}`,
    });

    if (cachedValue) {
      return cachedValue;
    }

    let image;
    image = await super.getCoverImage(root);

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
    if (image != null) {
      Cache.set({ key: `coverImage-${root.id}`, data: image });
    }
    return image;
  }

  async getTheme({ id, attributeValues: { themeColor } }) {
    const primary = get(themeColor, 'value');
    const theme = {
      type: 'DARK',
      colors: {
        primary,
      },
    };

    if (!primary) {
      const parentItemsCursor = await this.getCursorByChildContentItemId(id);
      if (parentItemsCursor) {
        const parentItems = await parentItemsCursor.get();

        if (parentItems.length) {
          const parentThemeColors = flatten(
            parentItems.map((i) => get(i, 'attributeValues.themeColor.value'))
          );
          if (parentThemeColors && parentThemeColors.length)
            [theme.colors.primary] = parentThemeColors;
        }
      }
    }

    // if there's still no primary color set in the CMS, we want to return a null theme so that
    // the front end uses its default theme:
    if (!theme.colors.primary) return null;

    return theme;
  }

  bySearchableContent = () =>
    this.request()
      .filterOneOf(
        uniq([
          ...ApollosConfig.ROCK_MAPPINGS.FEED_CONTENT_CHANNEL_IDS,
          ...ApollosConfig.ROCK_MAPPINGS.DISCOVER_CONTENT_CHANNEL_IDS,
        ]).map((id) => `ContentChannelId eq ${id}`)
      )
      .cache({ ttl: 60 })
      .andFilter(this.LIVE_CONTENT());

  byUserCampus = async ({ contentChannelIds = [] }) => {
    const { Person } = this.context.dataSources;

    const { campusGuid } = await Person.getCurrentUserCampusId();

    if (!campusGuid) {
      // No campus or no current user.
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

  async isContentActiveLiveStream({ id }) {
    const { LiveStream } = this.context.dataSources;
    const { isLive } = await LiveStream.getLiveStream();
    // if there is no live stream, then there is no live content. Easy enough!
    if (!isLive) return false;

    const mostRecentSermon = await (await this.byUserCampus({
      contentChannelIds: [16],
    })).first();

    // If the most recent sermon is the sermon we are checking, this is the live sermon.
    return mostRecentSermon && mostRecentSermon.id === id;
  }
}

export default ExtendedContentItem;
