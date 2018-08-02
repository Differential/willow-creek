import { RockModel } from '/api/connectors/rock';

export default class ContentChannel extends RockModel {
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
    // TODO: Rock doesn't seem to support expand on single resource requests
    // so we have to send a query request
    this.request()
      .filter(`Id eq ${id}`)
      .expand('ChildContentChannels')
      .top(1)
      .transform((list) => list[0])
      .get();
}
