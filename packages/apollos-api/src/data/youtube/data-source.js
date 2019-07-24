import { RESTDataSource } from 'apollo-datasource-rest';

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

  getChannelItems = async (channelId) => {
    const channels = await this.get('channels', {
      part: 'contentDetails',
      id: channelId,
    });
    const { relatedPlaylists } = channels.items.map(
      ({ contentDetails }) => contentDetails
    )[0];

    return this.getPlaylistItems(relatedPlaylists.uploads);
  };

  getPlaylistItems = async (playlistId) =>
    this.get('playlistItems', {
      part: 'snippet',
      playlistId,
      maxResults: 50,
    }).then((result) => ({
      ...result,
      items: result.items.map((item) => ({
        ...item,
        id: item.snippet.resourceId.videoId,
      })),
    }));
}
