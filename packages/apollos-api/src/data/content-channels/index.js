import { gql } from 'apollo-server';
import { createGlobalId } from '@apollosproject/server-core';

// export { default as model } from './model';
export { default as dataSource } from './data-source';

export const schema = gql`
  type ContentChannel implements Node {
    id: ID!
    name: String!
    description: String

    childContentChannels: [ContentChannel]
    childContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection

    iconName: String
  }

  extend type Query {
    contentChannels: [ContentChannel]
  }
`;

export const resolver = {
  Query: {
    contentChannels: (root, args, context) =>
      context.dataSources.ContentChannel.getRootChannels(),
  },
  ContentChannel: {
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(id, parentType.name),
    childContentItemsConnection: ({ id }, args, { dataSources }) =>
      dataSources.ContentItem.paginate({
        cursor: dataSources.ContentItem.byContentChannelId(id),
        args,
      }),
    iconName: () => 'text', // TODO
  },
};
