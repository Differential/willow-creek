import RockApolloDataSource from 'apollos-church-api/src/connectors/rock/data-source';

export default class Person extends RockApolloDataSource {
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
