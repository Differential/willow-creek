import RockApolloDataSource from '@apolloschurch/rock-apollo-data-source';

export default class ContentItem extends RockApolloDataSource {
  resource = 'ContentChannelItems';

  expanded = true;

  getCursorByParentContentItemId = async (id) => {
    const associations = await this.request('ContentChannelItemAssociations')
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
    const associations = await this.request('ContentChannelItemAssociations')
      .filter(`ChildContentChannelItemId eq ${id}`)
      .get();

    if (!associations || !associations.length) return null;
    const request = this.request();
    associations.forEach(({ contentChannelItemId }) => {
      request.filter(`Id eq ${contentChannelItemId}`);
    });

    return request.orderBy('Order');
  };

  getCursorBySiblingContentItemId = async (id) => {
    // Get all parents for the current item.
    const parentAssociations = await this.request(
      'ContentChannelItemAssociations'
    )
      .filter(`ChildContentChannelItemId eq ${id}`)
      .get();

    if (!parentAssociations || !parentAssociations.length) return null;

    // Now, fetch all children relations for those parents (excluding the original item)
    const siblingAssociationsRequest = await this.request(
      'ContentChannelItemAssociations'
    );
    parentAssociations.forEach(({ contentChannelItemId }) => {
      siblingAssociationsRequest.filter(
        `(ContentChannelItemId eq ${contentChannelItemId}) and (ChildContentChannelItemId ne ${id})`
      );
    });
    const siblingAssociations = await siblingAssociationsRequest.get();
    if (!siblingAssociations || !siblingAssociations.length) return null;

    const request = this.request();
    siblingAssociations.forEach(({ childContentChannelItemId }) => {
      request.filter(`Id eq ${childContentChannelItemId}`);
    });

    return request.orderBy('Order');
  };

  byUserFeed = () =>
    this.request() // TODO: load these IDs dynamically
      .filter(`ContentChannelId eq 1`)
      .filter(`ContentChannelId eq 2`)
      .filter(`ContentChannelId eq 3`)
      .filter(`ContentChannelId eq 4`)
      .filter(`ContentChannelId eq 5`)
      .filter(`ContentChannelId eq 6`)
      .filter(`ContentChannelId eq 8`)
      .orderBy('StartDateTime', 'desc');

  byContentChannelId = (id) =>
    this.request()
      .filter(`ContentChannelId eq ${id}`)
      .orderBy('StartDateTime', 'desc');

  getFromId = (id) =>
    this.request()
      .find(id)
      .get();
}
