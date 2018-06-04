import RestConnector from './rest';

const { ROCK_API, ROCK_TOKEN } = process.env;

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
}
