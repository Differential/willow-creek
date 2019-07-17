import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import { Mutation } from 'react-apollo';

import {
  ButtonLink,
  CenteredView,
  BackgroundView,
  FlexedView,
} from '@apollosproject/ui-kit';

import {
  MediaPlayerProvider,
  PLAY_VIDEO,
} from '@apollosproject/ui-media-player';
import MediaPlayerYoutube from '.';

storiesOf('ui-media-player-youtube/MediaPlayerYoutube', module).add(
  'simple',
  () => (
    <MediaPlayerProvider>
      <BackgroundView>
        <FlexedView>
          <CenteredView>
            <Mutation mutation={PLAY_VIDEO}>
              {(play) => (
                <ButtonLink
                  onPress={() =>
                    play({
                      variables: {
                        mediaSource: {
                          uri: 'FFkGi4bjfmg',
                          __typename: 'YoutubeMediaSource',
                        },
                        posterSources: [
                          {
                            uri:
                              'https://img.youtube.com/vi/FFkGi4bjfmg/maxresdefault.jpg',
                            __typename: 'ImageMediaSource',
                          },
                        ],
                        title: 'Welcome to the Willow Creek YouTube Channel',
                        artist: 'Willow Creek Community Church',
                        isVideo: true,
                      },
                    })
                  }
                >
                  Play YT video
                </ButtonLink>
              )}
            </Mutation>
          </CenteredView>
        </FlexedView>
        <MediaPlayerYoutube />
      </BackgroundView>
    </MediaPlayerProvider>
  )
);
