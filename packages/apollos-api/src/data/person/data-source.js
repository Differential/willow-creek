import { Person as personData } from '@apollosproject/data-connector-rock';

class Person extends personData.dataSource {
  async getCurrentUserCampusId() {
    const { Campus, Auth } = this.context.dataSources;

    try {
      // If we have a user
      const { attributeValues } = await Auth.getCurrentPerson();

      const { guid: campusGuid, id: campusId } = await Campus.getForPerson({
        attributeValues,
      });
      // The campus id is the current user's campus
      return { campusId, campusGuid };
    } catch (e) {
      // No campus or no current user.
    }
    return { campusId: null, campusGuid: null };
  }
}

export default Person;
