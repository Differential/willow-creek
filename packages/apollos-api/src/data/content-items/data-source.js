import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';
import { flatten, get } from 'lodash';

class ExtendedContentItem extends ContentItem.dataSource {
  expanded = true;

  // A cursor returning content items by a guid.
  // Returns a more inclusive cursor if no guid is passed.

  async getCoverImage(root) {
    const existingImage = await super.getCoverImage(root);

    if (existingImage) {
      return existingImage;
    }

    if (get(root, 'attributeValues.youtubeId.value', '') !== '') {
      const result = await this.context.dataSources.Youtube.getFromId(
        root.attributeValues.youtubeId.value
      );

      if (!result || !result.snippet) return null;
      const { snippet } = result;

      const availableSources = Object.keys(snippet.thumbnails).map(key => ({
        uri: snippet.thumbnails[key].url,
        width: snippet.thumbnails[key].width,
      }));

      const source = availableSources.sort((a, b) => b.width - a.width)[0];

      return {
        __typename: 'ImageMedia',
        sources: [source],
      };
    }

    return null;
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
            parentItems.map(i => get(i, 'attributeValues.themeColor.value'))
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

  byUserCampus = async ({ contentChannelIds = [] }) => {
    // let campusId;
    let campusGuid;
    // let personaGuids;
    const { Campus, Auth } = this.context.dataSources;

    try {
      // If we have a user
      const { id } = await Auth.getCurrentPerson();
      // And that user has a campus
      const { guid } = await Campus.getForPerson({
        personId: id,
      });
      // The campus id is the current user's campus
      campusGuid = guid;
    } catch (e) {
      // No campus or no current user.
      return this.request().empty();
    }

    // Return data matching just their campus
    const cursor = this.request(
      `Apollos/ContentChannelItemsByAttributeValue?attributeKey=Campus&attributeValues=${campusGuid}`
    );

    if (contentChannelIds.length !== 0) {
      cursor.filterOneOf(
        contentChannelIds.map(id => `ContentChannelId eq ${id}`)
      );
    }

    return cursor
      .andFilter(this.LIVE_CONTENT())
      .orderBy('StartDateTime', 'desc');
  };

  async byPersonaFeedAndCampus({ contentChannelIds = [], first = 3 }) {
    const { Person, Auth, Campus } = this.context.dataSources;

    const userPersonas = await Person.getPersonas({
      categoryId: ApollosConfig.ROCK_MAPPINGS.DATAVIEW_CATEGORIES.PersonaId,
    });

    if (userPersonas.length === 0) {
      return this.byUserCampus({ contentChannelIds });
    }

    const { id: personId } = await Auth.getCurrentPerson();
    const { id: campusId } = await Campus.getForPerson({
      personId,
    });

    const cursor = this.request(
      `Apollos/ContentChannelItemsByCampusIdAndAttributeValue?campusId=${campusId}&attributeKey=Personas&attributeValues=${userPersonas
        .map(({ guid }) => guid)
        .join(',')}`
    );

    if (contentChannelIds.length !== 0) {
      cursor.filterOneOf(
        contentChannelIds.map(id => `ContentChannelId eq ${id}`)
      );
    }

    return cursor
      .andFilter(this.LIVE_CONTENT())
      .orderBy('StartDateTime', 'desc')
      .top(first);
  }
}

export default ExtendedContentItem;
