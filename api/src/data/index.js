import { gql } from 'apollo-server';
import { mapValues, values, merge } from 'lodash';

import * as Node from './node';
import * as ContentChannel from './content-channels';
import * as ContentItem from './content-items';
import * as Person from './people';
import * as Media from './media';
import * as Auth from './auth';
import * as LiveStream from './live';

const data = {
  Node,
  ContentChannel,
  ContentItem,
  Person,
  Media,
  Auth,
  LiveStream,
};

export const schema = [
  ...values(data).map((datum) => datum.schema),
  gql`
    type Query {
      node(id: ID!): Node
      people(email: String!): [Person]
      userFeed(first: Int, after: String): ContentItemsConnection
      contentChannels: [ContentChannel]
      currentUser: AuthenticatedUser
      liveStream: LiveStream
    }

    type Mutation {
      authenticate(identity: String!, password: String!): Authentication
      registerPerson(email: String!, password: String!): Authentication
    }

    ${process.env.NODE_ENV === 'test' ? `scalar Upload` : ``}
  `,
];

export const resolvers = merge(...values(data).map((datum) => datum.resolver));

export const dataSources = mapValues(data, (datum) => datum.dataSource);

export const models = {
  ...mapValues(data, (datum) => datum.model),
  UniversalContentItem: ContentItem.model, // alias
};
