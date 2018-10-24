import { AuthenticationError } from 'apollo-server';
import RockApolloDataSource from 'apollos-rock-apollo-data-source';
import { parseGlobalId } from '../node';

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

  async getForContentItem({ contentItemId }) {
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

  async getForContentItems() {
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
