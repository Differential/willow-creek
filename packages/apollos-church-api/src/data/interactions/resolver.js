import { createGlobalId } from 'apollos-church-api/src/data/node/model';

export default {
  Mutation: {
    createSession: (root, args, { dataSources }) =>
      dataSources.Interactions.createSession(),
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
  Session: {
    id: (root) => createGlobalId(root.id, 'InteractionSession'),
  },
  Interaction: {
    id: (root) => createGlobalId(root.id, 'Interaction'),
  },
};
