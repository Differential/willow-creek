import { gql } from 'apollo-server';

import { createApolloServerConfig } from '@apollosproject/server-core';

import * as Analytics from '@apollosproject/data-connector-analytics';
import * as Scripture from '@apollosproject/data-connector-bible';
import * as Cloudinary from '@apollosproject/data-connector-cloudinary';
import * as OneSignal from '@apollosproject/data-connector-onesignal';
import * as Pass from '@apollosproject/data-connector-passes';
import * as Sms from '@apollosproject/data-connector-twilio';
import {
  Followings,
  Interactions,
  RockConstants,
  Person,
  ContentChannel,
  Sharable,
  Auth,
  PersonalDevice,
  Template,
  AuthSms,
  BinaryFiles,
} from '@apollosproject/data-connector-rock';

// This module is used to attach Rock User updating to the OneSignal module.
// This module includes a Resolver that overides a resolver defined in `OneSignal`
import * as OneSignalWithRock from './oneSignalWithRock';
import * as ContentItem from './content-items';
import * as LiveStream from './live';
import * as Theme from './theme';
import * as Campus from './campus';
import * as WillowTVContentItem from './willow-tv';
import * as WillowCalendarEventContentItem from './calendar-events';

const data = {
  Followings,
  ContentChannel,
  ContentItem,
  Person,
  Cloudinary,
  Auth,
  AuthSms,
  Sms,
  LiveStream,
  Theme,
  Scripture,
  Interactions,
  RockConstants,
  Sharable,
  Analytics,
  OneSignal,
  PersonalDevice,
  OneSignalWithRock,
  Pass,
  Template,
  Campus,
  WillowTVContentItem,
  WillowCalendarEventContentItem,
  BinaryFiles,
};

const {
  dataSources,
  resolvers,
  schema,
  context,
  applyServerMiddleware,
} = createApolloServerConfig(data);

export { dataSources, resolvers, schema, context, applyServerMiddleware };

// the upload Scalar is added
export const testSchema = [
  gql`
    scalar Upload
  `,
  ...schema,
];
