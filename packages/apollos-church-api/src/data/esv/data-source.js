import { RESTDataSource } from 'apollo-datasource-rest';

export default class ESVScripture extends RESTDataSource {
  resource = 'ESVScripture';

  baseURL = 'https://api.esv.org/v3/';

  token = process.env.ESV_KEY;

  willSendRequest(request) {
    request.headers.set('Authorization', `token ${this.token}`);
  }

  async getScripture(query) {
    return this.get(`passage/html/?q=${query}`);
  }
}
