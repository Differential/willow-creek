import { RockModel } from '/api/connectors/rock';

export default class Person extends RockModel {
  resource = 'People';

  getFromId = (id) =>
    this.request()
      .find(id)
      .get();

  getFromEmail = (email) =>
    this.request()
      .filter(`Email eq '${email}'`)
      .get();
}
