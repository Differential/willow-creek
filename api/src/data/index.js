import { gql } from 'apollo-server';
import { mapValues, values, merge } from 'lodash';

import * as Node from './node';
import * as ContentChannel from './content-channels';
import * as ContentItem from './content-items';
import * as Person from './people';
import * as Media from './media';
import * as Auth from './auth';

const data = {
  Node,
  ContentChannel,
  ContentItem,
  Person,
  Media,
  Auth,
};

export const schema = gql`
  ${values(data).map((datum) => datum.schema)}

  type Query {
    node(id: ID!): Node
    people(email: String): [Person]
    userFeed(first: Int, after: String): ContentItemsConnection
    contentChannels: [ContentChannel]
    currentUser: AuthenticatedUser
  }

  type Mutation {
    authenticate(identity: String, password: String): Authentication
  }
`;

export const resolvers = merge(...values(data).map((datum) => datum.resolver));

export const models = {
  ...mapValues(data, (datum) => datum.model),
  UniversalContentItem: ContentItem.model, // alias
};
