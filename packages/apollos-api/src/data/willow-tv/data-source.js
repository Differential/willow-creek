import { RESTDataSource } from 'apollo-datasource-rest';
import ApollosConfig from '@apollosproject/config';

export default class Youtube extends RESTDataSource {
  baseURL = 'https://content.googleapis.com/youtube/v3';

  willSendRequest = (request) => {
    request.params.set('key', process.env.YOUTUBE_API_KEY);
  };

  async getFromId(id) {
    const result = await this.get('videos', { part: 'snippet', id });
    if (!result.items || !result.items.length) return null;

    return result.items[0];
  }

  getPlaylistIdForCampus = async () => {
    let campusId = 'DEFAULT';
    try {
      const { id } = await this.context.dataSources.Auth.getCurrentPerson();
      const { id: rockCampusId } = this.context.dataSources.Campus.getForPerson(
        { personId: id }
      );
      campusId = rockCampusId;
    } catch (e) {
      // No campus or no current user.
    }

    if (ApollosConfig.YOUTUBE.PLAYLIST_FOR_CAMPUS[campusId]) {
      return ApollosConfig.YOUTUBE.PLAYLIST_FOR_CAMPUS[campusId];
    }
    return ApollosConfig.YOUTUBE.PLAYLIST_FOR_CAMPUS.DEFAULT;
  };

  getPlaylistItemsForCampus = async () => {
    const playlistId = await this.getPlaylistIdForCampus();
    this.getPlaylistItems(playlistId);
  };

  getPlaylistItems = (playlistId) =>
    this.get('playlistItems', {
      part: 'snippet',
      playlistId,
    }).then((result) => ({
      ...result,
      items: result.items.map((item) => ({
        ...item,
        id: item.snippet.resourceId.videoId,
      })),
    }));
}
