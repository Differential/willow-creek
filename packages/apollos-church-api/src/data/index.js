import { gql } from 'apollo-server';

import { createApolloServerConfig } from '@apollosproject/server-core';

import * as Auth from '@apollosproject/data-connector-rock-auth';
import RockConstants from '../connectors/rock/rock-constants';
import * as ContentChannel from './content-channels';
import * as ContentItem from './content-items';
import * as Person from './people';
import * as Media from './media';
import * as LiveStream from './live';
import * as Theme from './theme';
import * as Scripture from './bible';
import * as Interactions from './interactions';
import * as Sharable from './sharable';
import * as Analytics from './analytics';
import * as Family from './family';
import * as Pagination from './pagination';

const data = {
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
  Family,
  Pagination,
  UniversalContentItem: {
    dataSource: ContentItem.dataSource,
  }, // alias
  DevotionalContentItem: {
    dataSource: ContentItem.dataSource,
  }, // alias
};

const { dataSources, resolvers, schema, context } = createApolloServerConfig(
  data
);

export { dataSources, resolvers, schema, context };

// the upload Scalar is added
export const testSchema = [
  gql`
    scalar Upload
  `,
  ...schema,
];
