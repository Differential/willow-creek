import { RESTDataSource } from 'apollo-datasource-rest';

export default class LiveStream extends RESTDataSource {
  resource = 'LiveStream';

  baseURL = 'https://apollos.churchonline.org/api/v1/';

  async getLiveStream() {
    return this.get('events/current');
  }
}
