import React from 'react';
import renderer from 'react-test-renderer';

import { client } from 'apolloschurchapp/src/client';
import Providers from 'apolloschurchapp/src/Providers';

import FullscreenPlayer from './FullscreenPlayer';

describe('the FullscreenPlayer component', () => {
  it('should render miniplayer with video', async () => {
    client.cache.writeData({
      data: {
        mediaPlayer: {
          __typename: 'MediaPlayerState',
          currentTrack: {
            __typename: 'MediaPlayerTrack',
            id: 1,
            mediaSource: { uri: 'some-source' },
            posterSources: [{ uri: 'some-poster-source' }],
            title: 'Some Title',
            artist: 'some artist',
            isVideo: true,
          },
          isVisible: true,
          isFullscreen: false,
          isPlaying: true,
          progress: {
            __typename: 'MediaPlayerProgress',
            currentTime: 12,
            duration: 56,
          },
        },
      },
    });
    const tree = renderer.create(
      <Providers>
        <FullscreenPlayer />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render miniplayer with audio', async () => {
    client.cache.writeData({
      data: {
        mediaPlayer: {
          __typename: 'MediaPlayerState',
          currentTrack: {
            __typename: 'MediaPlayerTrack',
            id: 1,
            mediaSource: { uri: 'some-source' },
            posterSources: [{ uri: 'some-poster-source' }],
            title: 'Some Title',
            artist: 'some artist',
            isVideo: false,
          },
          isVisible: true,
          isFullscreen: false,
          isPlaying: true,
          progress: {
            __typename: 'MediaPlayerProgress',
            currentTime: 12,
            duration: 56,
          },
        },
      },
    });
    const tree = renderer.create(
      <Providers>
        <FullscreenPlayer />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render fullscreen', async () => {
    client.cache.writeData({
      data: {
        mediaPlayer: {
          __typename: 'MediaPlayerState',
          currentTrack: {
            __typename: 'MediaPlayerTrack',
            id: 1,
            mediaSource: { uri: 'some-source' },
            posterSources: [{ uri: 'some-poster-source' }],
            title: 'Some Title',
            artist: 'some artist',
            isVideo: false,
          },
          isVisible: true,
          isFullscreen: true,
          isPlaying: true,
          progress: {
            __typename: 'MediaPlayerProgress',
            currentTime: 12,
            duration: 56,
          },
        },
      },
    });
    const tree = renderer.create(
      <Providers>
        <FullscreenPlayer />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
