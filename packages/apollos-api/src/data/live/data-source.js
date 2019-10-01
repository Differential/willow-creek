import { RESTDataSource } from 'apollo-datasource-rest';
import ApollosConfig from '@apollosproject/config';

export default class LiveStream extends RESTDataSource {
  async getIsLive({ channelId }) {
    const response = await this.get(
      `https://www.youtube.com/channel/${channelId}/live`,
      null,
      { cacheOptions: { ttl: 60 } }
    );
    return response.includes('og:video:url');
  }

  // Given a logged in user, what is the youtube channelID of their campus?
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
    const campusConfig = ApollosConfig.ROCK_MAPPINGS.CAMPUS_DATA_VIEWS.find(
      ({ CampusId }) => CampusId === campusId
    );
    if (campusConfig) {
      return campusConfig.YoutubeChannelId;
    }
    return null;
  };

  async getLiveStream() {
    const channelId = await this.getPersonaGuidForCampus();
    if (!channelId) return null;

    return {
      isLive: this.getIsLive.bind(this, { channelId }),
    };
  }
}
