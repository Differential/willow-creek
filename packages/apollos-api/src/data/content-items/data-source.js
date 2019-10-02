import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';
import { get, insersectionBy } from 'lodash';

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

      const availableSources = Object.keys(snippet.thumbnails).map((key) => ({
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

  getContentItemsForCampus = async () => {
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
    return this.request(
      `Apollos/ContentChannelItemsByAttributeValue?attributeKey=Campus&attributeValues=${campusGuid}`
    ).orderBy('StartDateTime', 'desc');
  };

  byPersonaIds = async ({ personaIds }) => {
    const {
      dataSources: { Person },
    } = this.context;

    const userPersonas = await Person.getPersonas({
      categoryId: ApollosConfig.ROCK_MAPPINGS.DATAVIEW_CATEGORIES.PersonaId,
    });

    if (userPersonas.length === 0) {
      return this.request().empty();
    }

    // Get personas the user has, AND are in the personaIds array.
    const personaGuidsInCommon = insersectionBy(
      userPersonas,
      personaIds.map((id) => ({ id })),
      'id'
    );

    if (personaGuidsInCommon.length === 0) {
      return this.request().empty();
    }

    return this.request(
      `Apollos/ContentChannelItemsByDataViewGuids?guids=${personaGuidsInCommon
        .map(({ guid }) => guid)
        .join(',')}`
    ).orderBy('StartDateTime', 'desc');
  };
}

export default ExtendedContentItem;
