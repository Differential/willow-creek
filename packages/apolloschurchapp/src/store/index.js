import { merge, get } from 'lodash';
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
    mediaPlayerUpdateState(isPlaying: Boolean, isFullscreen: Boolean, isVisible: Boolean): Boolean
    mediaPlayerSetPlayhead(currentTime: Float): Boolean
    mediaPlayerPlayNow(
      parentId: ID,
      mediaSource: VideoMediaSource!,
      posterSources: [ImageMediaSource],
      title: String,
      artist: String,
      isVideo: Boolean,
    ): Boolean

    handleLogin(authToken: String!)
  }

  type MediaPlayerState {
    currentTrack: MediaPlayerTrack
    isPlaying: Boolean
    isFullscreen: Boolean
    isVisible: Boolean
    currentTime: Float
  }

  type MediaPlayerProgress {
    currentTime: Float
    playableDuration: Float
    seekableDuration: Float
    duration: Float
  }

  type MediaPlayerTrack {
    id: ID!
    parentId: ID
    mediaSource: VideoMediaSource!
    posterSources: [ImageMediaSource]
    title: String
    artist: String
    isVideo: Boolean
  }
`;

export const defaults = {
  authToken: null,
  sessionId: null,
  mediaPlayer: {
    __typename: 'MediaPlayerState',
    currentTrack: null,
    isPlaying: false,
    isFullscreen: false,
    isVisible: false,
    currentTime: 0,
  },
};

let trackId = 0;

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
    mediaPlayerPlayNow: (root, trackInfo, { cache }) => {
      const query = gql`
        query {
          mediaPlayer {
            isFullscreen
          }
        }
      `;
      const track = merge(
        {
          __typename: 'MediaPlayerTrack',
          parentId: null,
          mediaSource: null,
          posterSources: null,
          title: null,
          artist: null,
          isVideo: false,
        },
        trackInfo
      );

      const { mediaPlayer } = cache.readQuery({ query });

      const newMediaPlayerState = {
        __typename: 'MediaPlayerState',
        isPlaying: true,
        isVisible: true,
        isFullscreen: track.isVideo
          ? true
          : (mediaPlayer && mediaPlayer.isFullscreen) || false,
        currentTrack: track,
        currentTime: 0,
      };

      if (
        // if same track
        mediaPlayer &&
        mediaPlayer.currentTrack &&
        mediaPlayer.currentTrack.mediaSource.uri === track.mediaSource.uri
      ) {
        // use the same Id
        newMediaPlayerState.currentTrack.id = mediaPlayer.currentTrack.id;
      } else {
        // otherwise reset progress and use new Id
        newMediaPlayerState.currentTrack.id = trackId;
        newMediaPlayerState.progress = null;
        trackId += 1;
      }

      cache.writeData({
        query,
        data: {
          mediaPlayer: newMediaPlayerState,
        },
      });
      return null;
    },
    mediaPlayerUpdateState: (
      root,
      { isPlaying, isFullscreen, isVisible },
      { cache }
    ) => {
      const query = gql`
        query {
          mediaPlayer @client {
            isPlaying
            isFullscreen
            isVisible
          }
        }
      `;
      const { mediaPlayer } = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: {
          mediaPlayer: merge(mediaPlayer, {
            isPlaying,
            isFullscreen,
            isVisible,
            __typename: 'MediaPlayerState',
          }),
        },
      });
      return null;
    },
    mediaPlayerSetPlayhead: (root, { currentTime }, { cache }) => {
      const query = gql`
        query {
          mediaPlayer @client {
            currentTime
          }
        }
      `;
      const { mediaPlayer } = cache.readQuery({ query });
      cache.writeQuery({
        query,
        data: {
          mediaPlayer: {
            __typename: 'MediaPlayerState',
            currentTime:
              currentTime || get(mediaPlayer.progress, 'currentTime') || 0,
          },
        },
      });
      return null;
    },
  },
};
