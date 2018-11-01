import { RESTDataSource } from 'apollo-datasource-rest';
import ApollosConfig from '@apolloschurch/config';

const { BIBLE_API } = ApollosConfig;

export default class Scripture extends RESTDataSource {
  resource = 'Scripture';

  baseURL = 'https://api.scripture.api.bible/v1/bibles/';

  token = BIBLE_API.KEY;

  willSendRequest(request) {
    request.headers.set('api-key', `${this.token}`);
  }

  async getScripture(query) {
    const bibleId = BIBLE_API.BIBLE_ID;
    return this.get(`${bibleId}/search?query=${query}`);
  }

  // In the future, we can use this field to handle content that returns multiple
  // "scriptures". Like references across several different books of the bible.
  async getScriptures(query) {
    const scripture = await this.getScripture(query);
    return [scripture];
  }
}
