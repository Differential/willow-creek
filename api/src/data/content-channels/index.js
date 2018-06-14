import { gql } from 'apollo-server';
import { createGlobalId } from '../node';

export { default as model } from './model';

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
`;

export const resolver = {
  Query: {
    contentChannels: (root, args, context) =>
      context.models.ContentChannel.all(),
  },
  ContentChannel: {
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(id, parentType.name),
    childContentItemsConnection: ({ id }, args, { models }) =>
      models.ContentItem.paginate({
        cursor: models.ContentItem.byContentChannelId(id),
        args,
      }),
    iconName: () => 'text', // TODO
  },
};
