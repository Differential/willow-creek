import RockApolloDataSource from '/api/connectors/rock/data-source';

export default class ContentChannel extends RockApolloDataSource {
  resource = 'ContentChannels';

  all = () =>
    this.request()
      .expand('ChildContentChannels')
      .get();

  getRootChannels = () =>
    this.request()
      .filter('Id eq 2')
      .filter('Id eq 3')
      .filter('Id eq 4')
      .filter('Id eq 6')
      .filter('Id eq 8')
      .get();

  getFromId = (id) =>
    this.request()
      .filter(`Id eq ${id}`)
      .expand('ChildContentChannels')
      .top(1)
      .transform((list) => list[0])
      .get();
}
