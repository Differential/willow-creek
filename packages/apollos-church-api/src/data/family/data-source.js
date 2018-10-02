import RockApolloDataSource from 'apollos-church-api/src/connectors/rock/data-source';

export default class Family extends RockApolloDataSource {
  resource = 'Family';

  getFamily({ userId }) {
    if (!userId) {
      throw new Error('UserID is required to fetch a family');
    }
    return this.request(`/Groups/GetFamilies/${userId}`);
  }

  async getFamilyLocation({ userId }) {
    const familyReq = await this.getFamily({ userId })
      .expand('GroupLocations,Campus,GroupLocations/Location')
      .get();

    if (familyReq.length === 0) return null;

    const family = familyReq[0];
    // First option - a user's address city/state.
    if (family.groupLocations.length && family.groupLocations[0].location) {
      const { location } = family.groupLocations[0];
      return `${location.city}, ${location.state}`;
    }

    // Second option - their campus name
    if (family.campus) {
      return family.campus.name;
    }

    return null;
  }
}
