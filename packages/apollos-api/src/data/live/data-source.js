import { RESTDataSource } from 'apollo-datasource-rest';

export default class LiveStream extends RESTDataSource {
  resource = 'LiveStream';

  baseURL = 'https://willowcreek.tv/api';

  async getLiveStream() {
    const response = await this.get('live');
    return response.live;
  }
}
