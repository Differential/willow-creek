import { merge } from 'lodash';
import gql from 'graphql-tag';
import { client } from '../client'; // eslint-disable-line
import getAuthToken from './getAuthToken';
import getSessionId from './getSessionId';
// TODO: this will require more organization...ie...not keeping everything in one file.
// But this is simple while our needs our small.

export const schema = `
  type Query {
    authToken: String
    sessionId: String
    mediaPlayer: MediaPlayerState
  }

  type Mutation {
    logout
    handleLogin(authToken: String!)
    mediaPlayerUpdatePlayer(isPlaying: Bool)
    mediaPlayerNext(skip: Int)
    mediaPlayerEnqueue(name: String)
  }

  type MediaPlayerState {
    nowPlaying: MediaPlayerTrack
    nowPlayingIndex: Int
    queue: [MediaPlayerTrack]
    isPlaying: Bool
  }

  type MediaPlayerTrack {
    # TODO: what data do we _need_ to store client side for tracks?
    name: String
  }
`;

export const defaults = {
  authToken: null,
  sessionId: null,
  mediaPlayer: {
    __typename: 'MediaPlayerState',
    nowPlayingIndex: 0,
    queue: [],
    isPlaying: false,
  },
};

export const resolvers = {
  Mutation: {
    logout: (root, variables, { cache }) => {
      client.resetStore();
      cache.writeData({ data: { authToken: null, sessionId: null } });
      return null;
    },
    handleLogin: async (root, { authToken }, { cache }) => {
      const createSessionMutation = gql`
        mutation {
          createSession {
            id
          }
        }
      `;

      try {
        await cache.writeQuery({
          query: getAuthToken,
          data: { authToken },
        });

        const {
          data: { createSession },
        } = await client.mutate({
          mutation: createSessionMutation,
        });

        await cache.writeQuery({
          query: getSessionId,
          data: { sessionId: createSession.id },
        });
      } catch (e) {
        console.log(e);
      }
    },
    mediaPlayerEnqueue: (root, { name }, { cache }) => {
      const query = gql`
        query {
          mediaPlayer @client {
            queue
          }
        }
      `;
      const { mediaPlayer } = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: {
          mediaPlayer: {
            __typename: 'MediaPlayerState',
            queue: [...mediaPlayer.queue, { name }],
          },
        },
      });
    },
    mediaPlayerNext: (root, { skip = 1 }, { cache }) => {
      const query = gql`
        query {
          mediaPlayer @client {
            nowPlayingIndex
            queue
          }
        }
      `;
      const { mediaPlayer } = cache.readQuery({ query });

      let nowPlayingIndex = mediaPlayer.nowPlayingIndex + skip;
      if (nowPlayingIndex < 0) nowPlayingIndex = mediaPlayer.queue.length - 1;
      if (nowPlayingIndex >= mediaPlayer.queue.length) nowPlayingIndex = 0;

      cache.writeQuery({
        query,
        data: {
          mediaPlayer: {
            __typename: 'MediaPlayerState',
            nowPlayingIndex,
            queue: query.queue,
          },
        },
      });
    },
    mediaPlayerUpdatePlayer: (root, { isPlaying }, { cache }) => {
      const query = gql`
        query {
          mediaPlayer @client {
            isPlaying
          }
        }
      `;
      const { mediaPlayer } = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: {
          mediaPlayer: merge(mediaPlayer, {
            isPlaying,
            __typename: 'MediaPlayerState',
          }),
        },
      });
    },
  },
};
