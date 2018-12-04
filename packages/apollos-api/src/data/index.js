import { gql } from 'apollo-server';

import { createApolloServerConfig } from '@apollosproject/server-core';

import * as Auth from '@apollosproject/data-connector-rock-auth';
import {
  ContentChannel,
  Sharable,
} from '@apollosproject/data-connector-rock-content';
import * as Analytics from '@apollosproject/data-connector-analytics';
import { Person, Family } from '@apollosproject/data-connector-people';
import * as Scripture from '@apollosproject/data-connector-bible';

import RockConstants from '../connectors/rock/rock-constants';

import * as ContentItem from './content-items';
import * as LiveStream from './live';
import * as Theme from './theme';
import * as Interactions from './interactions';
import * as WillowTVContentItem from './willow-tv';
import * as WillowCalendarEventContentItem from './calendar-events';

const data = {
  ContentChannel,
  ContentItem,
  Person,
  Auth,
  LiveStream,
  Theme,
  Scripture,
  Interactions,
  RockConstants: { dataSource: RockConstants },
  Sharable,
  Analytics,
  Family,
  UniversalContentItem: {
    dataSource: ContentItem.dataSource,
  }, // alias
  DevotionalContentItem: {
    dataSource: ContentItem.dataSource,
  }, // alias
  ContentSeriesContentItem: {
    dataSource: ContentItem.dataSource,
  }, // alias
  MediaContentItem: {
    dataSource: ContentItem.dataSource,
  }, // alias
  WillowTVContentItem,
  WillowCalendarEventContentItem,
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
