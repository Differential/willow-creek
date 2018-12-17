import { gql } from 'apollo-server';

import { createApolloServerConfig } from '@apollosproject/server-core';

import {
  ContentChannel,
  Sharable,
  Auth,
  Person,
  Family,
  Interactions,
  Followings,
  RockConstants,
} from '@apollosproject/data-connector-rock';
import * as Analytics from '@apollosproject/data-connector-analytics';
import * as Scripture from '@apollosproject/data-connector-bible';

import * as ContentItem from './content-items';
import * as LiveStream from './live';
import * as Theme from './theme';
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
  RockConstants,
  Sharable,
  Analytics,
  Family,
  Followings,
  UniversalContentItem: ContentItem,
  DevotionalContentItem: ContentItem,
  ContentSeriesContentItem: ContentItem,
  MediaContentItem: ContentItem,
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
