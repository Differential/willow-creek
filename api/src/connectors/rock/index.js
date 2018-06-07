import RestConnector from '../rest';
import RequestBuilder from './RequestBuilder';
import * as Constants from './constants';

export { default as RockModel } from './Model';
export { Constants };

const { ROCK_API, ROCK_TOKEN } = Constants;

export default class RockConnector extends RestConnector {
  constructor() {
    super({
      batch: false,
      baseUrl: ROCK_API,
      defaultRequestOptions: {
        headers: {
          'Authorization-Token': ROCK_TOKEN,
        },
      },
    });
  }

  request = (resource) =>
    new RequestBuilder({
      resource,
      connector: this,
    });
}
