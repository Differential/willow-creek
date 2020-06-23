import { gql } from 'apollo-server';

import { createApolloServerConfig } from '@apollosproject/server-core';

import * as Analytics from '@apollosproject/data-connector-analytics';
import * as Scripture from '@apollosproject/data-connector-bible';
import * as Cloudinary from '@apollosproject/data-connector-cloudinary';
import * as OneSignal from '@apollosproject/data-connector-onesignal';
import * as Pass from '@apollosproject/data-connector-passes';
import * as Cache from '@apollosproject/data-connector-redis-cache';
import * as Sms from '@apollosproject/data-connector-twilio';
import {
  Followings,
  Interactions,
  RockConstants,
  ContentChannel,
  Sharable,
  PersonalDevice,
  Template,
  Group,
  BinaryFiles,
  PrayerRequest,
} from '@apollosproject/data-connector-rock';

// This module is used to attach Rock User updating to the OneSignal module.
// This module includes a Resolver that overides a resolver defined in `OneSignal`
import * as OneSignalWithRock from './oneSignalWithRock';
import * as ContentItem from './content-items';
import * as LiveStream from './live';
import * as Theme from './theme';
import * as Campus from './campus';
import * as Event from './event';
import * as Feature from './features';
import * as Person from './person';

import * as Youtube from './youtube';
import * as Search from './search';
import * as Auth from './auth';
import * as AuthSms from './auth-sms';

// Included only in Dev.
import * as YoutubeImport from './youtube-import';

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
  Search,
  Template,
  Campus,
  Youtube,
  BinaryFiles,
  YoutubeImport,
  Group,
  Feature,
  Event,
  Cache,
  PrayerRequest,
};

// If we are in development mode, we allow users to import data from Youtube.
const isDev =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

if (isDev) {
  data.YoutubeImport = YoutubeImport;
}

const {
  dataSources,
  resolvers,
  schema,
  context,
  applyServerMiddleware,
  setupJobs,
} = createApolloServerConfig(data);

export {
  dataSources,
  resolvers,
  schema,
  context,
  applyServerMiddleware,
  setupJobs,
};

// the upload Scalar is added
export const testSchema = [
  gql`
    scalar Upload
  `,
  ...schema,
];
