import { gql } from 'apollo-server';
import { mapValues, values, merge, compact } from 'lodash';

import RockConstants from 'apollos-church-api/src/connectors/rock/rock-constants';
import * as Node from './node';
import * as ContentChannel from './content-channels';
import * as ContentItem from './content-items';
import * as Person from './people';
import * as Media from './media';
import * as Auth from './auth';
import * as LiveStream from './live';
import * as Theme from './theme';
import * as Scripture from './bible';
import * as Interactions from './interactions';
import * as Sharable from './sharable';
import * as Analytics from './analytics';

const data = {
  Node,
  ContentChannel,
  ContentItem,
  Person,
  Media,
  Auth,
  LiveStream,
  Theme,
  Scripture,
  Interactions,
  RockConstants: { dataSource: RockConstants },
  Sharable,
  Analytics,
};

export const schema = [
  gql`
    type Query {
      _placeholder: Boolean # needed, empty schema defs aren't supported
      currentUser: AuthenticatedUser
    }

    type Mutation {
      authenticate(identity: String!, password: String!): Authentication
      registerPerson(email: String!, password: String!): Authentication
    }
  `,
  ...compact(values(data).map((datum) => datum.schema)),
];

export const resolvers = merge(
  ...compact(values(data).map((datum) => datum.resolver))
);

export const dataSources = mapValues(data, (datum) => datum.dataSource);

export const models = {
  ...mapValues(data, (datum) => datum.model),
  UniversalContentItem: ContentItem.model, // alias
};
