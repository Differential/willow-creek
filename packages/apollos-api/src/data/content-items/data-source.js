import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';
import { get } from 'lodash';

class ExtendedContentItem extends ContentItem.dataSource {
  expanded = true;

  // A cursor returning content items by a guid.
  // Returns a more inclusive cursor if no guid is passed.

  async getCoverImage(root) {
    if (get(root, 'attributeValues.youtubeId.value', '') !== '') {
      const { snippet } = await this.context.dataSources.Youtube.getFromId(
        root.attributeValues.youtubeId.value
      );

      const sources = Object.keys(snippet.thumbnails).map((key) => ({
        uri: snippet.thumbnails[key].url,
      }));

      return {
        __typename: 'ImageMedia',
        sources,
      };
    }

    return super.getCoverImage(root);
  }

  byPersonaGuid = (guid) =>
    guid
      ? this.request(`ContentChannelItems/GetFromPersonDataView?guids=${guid}`)
          .andFilter(this.LIVE_CONTENT())
          .orderBy('StartDateTime', 'desc')
      : this.request('ContentChannelItems')
          .andFilter(this.LIVE_CONTENT())
          .orderBy('StartDateTime', 'desc');

  // Given a logged in user, what is the GUID of their campuses data view?
  getPersonaGuidForCampus = async () => {
    let campusId;
    try {
      // If we have a user
      const { id } = await this.context.dataSources.Auth.getCurrentPerson();
      // And that user has a campus
      const {
        id: rockCampusId,
      } = await this.context.dataSources.Campus.getForPerson({ personId: id });
      // The campus id is the current user's campus
      campusId = rockCampusId;
    } catch (e) {
      // No campus or no current user.
      return null;
    }

    // Now let's lookup the GUID for the CampusId (static values)
    if (
      ApollosConfig.ROCK_MAPPINGS.CAMPUS_DATA_VIEWS.find(
        ({ CampusId }) => CampusId === campusId
      )
    ) {
      return ApollosConfig.ROCK_MAPPINGS.CAMPUS_DATA_VIEWS.find(
        ({ CampusId }) => CampusId === campusId
      ).CampusDataViewGuid;
    }
    return null;
  };

  getContentItemsForCampus = async () => {
    const campusPersonaGuid = await this.getPersonaGuidForCampus();
    return this.byPersonaGuid(campusPersonaGuid);
  };

  byPersonaFeed = async ({
    first = 3,
    personaId = ApollosConfig.ROCK_MAPPINGS.DATAVIEW_CATEGORIES.PersonaId,
  }) => {
    const {
      dataSources: { Person },
    } = this.context;

    // Grabs the guids associated with all dataviews user is memeber
    const getPersonaGuidsForUser = await Person.getPersonas({
      categoryId: personaId,
    });

    if (getPersonaGuidsForUser.length === 0) {
      return this.request().empty();
    }

    // Grabs content items based on personas
    return this.request(
      `ContentChannelItems/GetFromPersonDataView?guids=${getPersonaGuidsForUser
        .map((obj) => obj.guid)
        .join()}`
    )
      .andFilter(this.LIVE_CONTENT())
      .top(first)
      .orderBy('StartDateTime', 'desc');
  };
}

export default ExtendedContentItem;
