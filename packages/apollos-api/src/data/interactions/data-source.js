import { AuthenticationError } from 'apollo-server';
import { parseGlobalId } from '@apollosproject/server-core';
import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';

export default class Interactions extends RockApolloDataSource {
  resource = 'Interactions';

  async createInteraction({ nodeId, operationName }) {
    const { dataSources } = this.context;
    const { id, __type } = parseGlobalId(nodeId);
    const contentItemType = await dataSources.RockConstants.modelTypeId(__type);
    const interactionComponent = await this.context.dataSources.RockConstants.interactionComponent();
    const currentUser = await dataSources.Auth.getCurrentPerson();

    const interactionId = await this.post('/Interactions', {
      RelatedEntityId: id,
      RelatedEntityTypeId: contentItemType.id,
      PersonAliasId: currentUser.primaryAliasId,
      InteractionComponentId: interactionComponent.id,
      InteractionSessionId: this.context.sessionId,
      Operation: operationName,
      InteractionDateTime: new Date().toJSON(),
    });
    return this.get(`/Interactions/${interactionId}`);
  }

  async getCountByOperationForContentItem({ contentItemId, operation }) {
    const { dataSources } = this.context;
    const contentItemType = await dataSources.RockConstants.modelTypeId(
      'ContentItem'
    );
    try {
      return (await this.request('Interactions')
        .filter(
          // eslint-disable-next-line prettier/prettier
          `(RelatedEntityId eq ${contentItemId}) and (Operation eq '${operation}') and (RelatedEntityTypeId eq ${
            contentItemType.id
          })`
        )
        .select('Id') // $count not supported, next best thing to make efficient
        .cache({ ttl: 1800 }) // TODO: whats the right way to do this?
        .get()).length;
    } catch (e) {
      if (e instanceof AuthenticationError) {
        return [];
      }
      throw e;
    }
  }

  async getByCurrentUserForContentItem({ contentItemId }) {
    const { dataSources } = this.context;
    const contentItemType = await dataSources.RockConstants.modelTypeId(
      'ContentItem'
    );
    try {
      const currentUser = await dataSources.Auth.getCurrentPerson();
      return this.request('Interactions')
        .filter(
          // eslint-disable-next-line prettier/prettier
          `(RelatedEntityId eq ${contentItemId}) and (RelatedEntityTypeId eq ${
            contentItemType.id
          }) and (PersonAliasId eq ${currentUser.primaryAliasId})`
        )
        .get();
    } catch (e) {
      if (e instanceof AuthenticationError) {
        return [];
      }
      throw e;
    }
  }

  async getByCurrentUserForContentItems() {
    const { dataSources } = this.context;
    const contentItemType = await dataSources.RockConstants.modelTypeId(
      'ContentItem'
    );
    try {
      const currentUser = await dataSources.Auth.getCurrentPerson();
      return this.request('Interactions')
        .filter(
          // eslint-disable-next-line prettier/prettier
          `(RelatedEntityTypeId eq ${
            contentItemType.id
          }) and (PersonAliasId eq ${currentUser.primaryAliasId})`
        )
        .get();
    } catch (e) {
      if (e instanceof AuthenticationError) {
        return [];
      }
      throw e;
    }
  }
}
