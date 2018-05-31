import { gql } from 'apollo-server';

import { createGlobalId } from '../node';

export { default as model } from './model';

export const schema = gql`
  type ContentChannel implements Node {
    id: ID!
    name: String!
    description: String
  }
`;

export const resolver = {
  Query: {
    contentChannels: (root, args, context) =>
      context.models.ContentChannel.all(),
  },
  ContentChannel: {
    id: ({ id }, _, $, { parentType }) => createGlobalId(id, parentType.name),
  },
};
