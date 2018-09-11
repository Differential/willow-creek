import { RESTDataSource } from 'apollo-datasource-rest';

export default class Scripture extends RESTDataSource {
  resource = 'Scripture';

  baseURL = 'https://api.scripture.api.bible/v1/bibles/';

  token = process.env.BIBLE_API_KEY;

  willSendRequest(request) {
    request.headers.set('api-key', `${this.token}`);
  }

  async getScripture(query) {
    const bibleId = process.env.BIBLE_ID;
    return this.get(`${bibleId}/search?query=${query}`);
  }
}
