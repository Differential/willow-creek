import RockApolloDataSource from 'apollos-church-api/src/connectors/rock/data-source';
import { parseGlobalId } from 'apollos-church-api/src/data/node';
import { AuthenticationError } from 'apollo-server';

export default class Interactions extends RockApolloDataSource {
  resource = 'Interactions';

  async createSession() {
    const currentUser = await this.context.dataSources.Auth.getCurrentPerson();
    const interactionId = await this.post('/InteractionSessions', {
      PersonAliasId: currentUser.primaryAliasId,
    });
    return this.get(`/InteractionSessions/${interactionId}`);
  }

  async createInteraction({ nodeId, operationName, sessionId }) {
    const { dataSources } = this.context;
    const { id, __type } = parseGlobalId(nodeId);
    const parsedSessionId = parseGlobalId(sessionId).id;
    const contentItemType = await dataSources.RockConstants.modelTypeId(__type);
    const interactionComponent = await this.context.dataSources.RockConstants.interactionComponent();
    const currentUser = await dataSources.Auth.getCurrentPerson();

    const interactionId = await this.post('/Interactions', {
      RelatedEntityId: id,
      RelatedEntityTypeId: contentItemType.id,
      PersonAliasId: currentUser.primaryAliasId,
      InteractionComponentId: interactionComponent.id,
      InteractionSessionId: parsedSessionId,
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
`(RelatedEntityId eq ${contentItemId}) and (RelatedEntityTypeId eq ${contentItemType.id}) and (PersonAliasId eq ${currentUser.primaryAliasId})`
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
