import gql from 'graphql-tag';

import { schema as mediaPlayerSchema } from '@apollosproject/ui-media-player';
import { updatePushId } from '@apollosproject/ui-notifications';

import { identify } from '@apollosproject/ui-analytics';

import CACHE_LOADED from '../client/getCacheLoaded'; // eslint-disable-line

// TODO: this will require more organization...ie...not keeping everything in one file.
// But this is simple while our needs our small.

export const schema = `
  type Query {
    devicePushId: String
    cacheLoaded: Boolean
    notificationsEnabled: Boolean
  }

  type Mutation {
    cacheMarkLoaded
    updateDevicePushId(pushId: String!)
    updatePushPermissions(enabled: Boolean!)
  }
${mediaPlayerSchema}
`;

export const defaults = {
  __typename: 'Query',
  cacheLoaded: false,
  mediaPlayer: {
    __typename: 'MediaPlayerState',
  },
};

const GET_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`;

export const resolvers = {
  Mutation: {
    cacheMarkLoaded: async (root, args, { cache, client }) => {
      cache.writeQuery({
        query: CACHE_LOADED,
        data: {
          cacheLoaded: true,
        },
      });
      const { data: { isLoggedIn } = {} } = await client.query({
        query: GET_LOGGED_IN,
      });

      const { pushId } = cache.readQuery({
        query: gql`
          query {
            pushId @client
          }
        `,
      });

      if (isLoggedIn) {
        // TODO: Export `identify` from ui-analytics and use ui-analytics.identify directly.
        identify({ client });
      }

      if (isLoggedIn && pushId) {
        updatePushId({ pushId, client });
      }
      return null;
    },
  },
};
