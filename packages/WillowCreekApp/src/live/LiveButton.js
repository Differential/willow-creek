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
import { playVideoMutation } from 'WillowCreekApp/src/ui/MediaPlayer/mutations';

import getLiveStream from './getLiveStream';

const LiveCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.lightSecondary,
}))(Card);

const LiveNowButton = () => (
  <Query
    query={getLiveStream}
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
        <Mutation mutation={playVideoMutation}>
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
          )}g
        </Mutation>
      ) : null;
    }}
  </Query>
);

export default LiveNowButton;
