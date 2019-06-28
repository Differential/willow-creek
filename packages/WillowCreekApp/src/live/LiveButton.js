import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { get } from 'lodash';

import {
  Card,
  CardContent,
  TouchableScale,
  styled,
  ChannelLabel,
  UIText,
} from '@apollosproject/ui-kit';

import { PLAY_VIDEO } from '@apollosproject/ui-media-player';
import GET_LIVE_STREAM from './getLiveStream';

const LiveCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.lightSecondary,
}))(Card);

const LiveNowButton = () => (
  <Query
    query={GET_LIVE_STREAM}
    fetchPolicy="cache-and-network"
    pollInterval={60000}
  >
    {({ loading, data }) => {
      const isLive = get(data, 'liveStream.isLive', false);

      const videoSource = get(data, 'liveStream.stream.sources[0]', null);
      const coverImageSources = [
        get(data, 'liveStream.stream.thumbnail', null),
      ];

      return isLive ? (
        <Mutation mutation={PLAY_VIDEO}>
          {(play) => (
            <TouchableScale
              onPress={() =>
                play({
                  variables: {
                    mediaSource: videoSource,
                    posterSources: coverImageSources,
                    title: get(data, 'liveStream.stream.label'),
                    isVideo: true,
                    artist: null,
                  },
                })
              }
            >
              <LiveCard isLoading={loading}>
                <CardContent>
                  <ChannelLabel
                    icon="video"
                    label={
                      <UIText>
                        <UIText bold>{`We're live.`} </UIText>
                        Watch now!
                      </UIText>
                    }
                  />
                </CardContent>
              </LiveCard>
            </TouchableScale>
          )}
        </Mutation>
      ) : null;
    }}
  </Query>
);

export default LiveNowButton;
