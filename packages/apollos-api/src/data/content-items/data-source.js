import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';

class ExtendedContentItem extends ContentItem.dataSource {
  expanded = true;

  byPersonaGuid = (guid) =>
    guid
      ? this.request(`ContentChannelItems/GetFromPersonDataView?guids=${guid}`)
          .andFilter(this.LIVE_CONTENT())
          .orderBy('StartDateTime', 'desc')
      : this.request('ContentChannelItems')
          .andFilter(this.LIVE_CONTENT())
          .orderBy('StartDateTime', 'desc');

  getPersonaGuidForCampus = async () => {
    let campusId = 'DEFAULT';
    try {
      const { id } = await this.context.dataSources.Auth.getCurrentPerson();
      const {
        id: rockCampusId,
      } = await this.context.dataSources.Campus.getForPerson({ personId: id });
      campusId = rockCampusId;
    } catch (e) {
      // No campus or no current user.
      return null;
    }

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
}

export default ExtendedContentItem;
