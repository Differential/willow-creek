import { createGlobalId } from 'apollos-church-api/src/data/node/model';

export default {
  Mutation: {
    updateLikeEntity: async (
      root,
      { input: { nodeId, sessionId, operation } },
      { dataSources }
    ) =>
      dataSources.Interactions.createInteraction({
        nodeId,
        sessionId,
        operationName: operation,
      }),
  },
  Interaction: {
    id: (root) => createGlobalId(root.id, 'Interaction'),
  },
};
