import { RESTDataSource } from 'apollo-datasource-rest';

export default class LiveStream extends RESTDataSource {
  baseURL = 'https://willowcreek.tv/api/';

  async getAll() {
    return this.get('all', null, { ttl: 86400 });
  }

  async getLiveStream() {
    return this.get('live');
  }

  async getLatestService() {
    const { latestService } = await this.getAll();
    return latestService;
  }

  async getArchives() {
    const { archives } = await this.getAll();
    return archives.filter(
      ({ name, series_name, img }) => name && series_name && img // eslint-disable-line camelcase
    );
  }

  getFromId(id){
    return this.get(id.replace(this.baseURL, ''));
  }
}
