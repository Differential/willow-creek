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
  getYoutubeChannelIdForCampus = async () => {
    const { Person } = this.context.dataSources;
    const { campusId } = await Person.getCurrentUserCampusId();

    if (!campusId) {
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
    const channelId = await this.getYoutubeChannelIdForCampus();
    if (!channelId) return null;

    return {
      isLive: this.getIsLive.bind(this, { channelId }),
    };
  }
}
