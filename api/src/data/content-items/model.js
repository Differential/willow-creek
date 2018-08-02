import { RockModel } from '/api/connectors/rock';

export default class ContentItem extends RockModel {
  resource = 'ContentChannelItems';

  request = () => {
    const request = RockModel.prototype.request.call(this);
    request.query.loadAttributes = 'expanded';
    return request;
  };

  getCursorByParentContentItemId = async (id) => {
    const associations = await this.context.connectors.Rock.request(
      'ContentChannelItemAssociations'
    )
      .filter(`ContentChannelItemId eq ${id}`)
      .get();

    if (!associations || !associations.length) return null;

    const request = this.request();
    associations.forEach(({ childContentChannelItemId }) => {
      request.filter(`Id eq ${childContentChannelItemId}`);
    });

    return request.orderBy('Order');
  };

  getCursorByChildContentItemId = async (id) => {
    const associations = await this.context.connectors.Rock.request(
      'ContentChannelItemAssociations'
    )
      .filter(`ChildContentChannelItemId eq ${id}`)
      .get();

    if (!associations || !associations.length) return null;

    const request = this.request();
    associations.forEach(({ contentChannelItemId }) => {
      request.filter(`Id eq ${contentChannelItemId}`);
    });

    return request.orderBy('Order');
  };

  byUserFeed = () =>
    this.request() // TODO: load these IDs dynamically
      .filter(`ContentChannelId eq 2`)
      .filter(`ContentChannelId eq 3`)
      .filter(`ContentChannelId eq 4`)
      .filter(`ContentChannelId eq 5`)
      .filter(`ContentChannelId eq 6`)
      .orderBy('StartDateTime', 'desc');

  byContentChannelId = (id) =>
    this.request().filter(`ContentChannelId eq ${id}`);

  getFromId = (id) =>
    this.request()
      .find(id)
      .get();
}
