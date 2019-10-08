import { Features as baseFeatures } from '@apollosproject/data-connector-rock';
import { resolverMerge } from '@apollosproject/server-core';
import ApollosConfig from '@apollosproject/config';

const resolver = {
  ActionListAction: {
    relatedNode: async ({ relatedNode }, _, { dataSources }) => {
      const { POINTER_CHANNEL_TYPE_ID } = ApollosConfig.ROCK_MAPPINGS;
      if (relatedNode.contentChannelTypeId !== POINTER_CHANNEL_TYPE_ID)
        return relatedNode;

      const { contentItem, event } = relatedNode.attributeValues;

      if (contentItem.value) {
        const [node] = await dataSources.ContentItem.request()
          .filter(`guid eq guid'${contentItem.value}'`)
          .get();
        return node;
      }

      if (event.value) {
        const [node] = await dataSources.Event.request()
          .filter(`guid eq guid'${event.value}'`)
          .get();
        return node;
      }

      return null;
    },
  },
};

export default resolverMerge(resolver, baseFeatures);
