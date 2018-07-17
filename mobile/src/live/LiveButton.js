import React from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import { UIText } from 'ui/typography';
import Card, { CardContent } from 'ui/Card';
import Touchable from 'ui/Touchable';
import styled from 'ui/styled';
import ChannelLabel from 'ui/ChannelLabel';
import { WebBrowserConsumer } from 'ui/WebBrowser';

import getLiveStream from './getLiveStream.graphql';

const LiveCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.lightSecondary,
}))(Card);

const LiveNowButton = () => (
  <Query query={getLiveStream}>
    {({ loading, data }) => {
      const isLive = get(data, 'liveStream.isLiveNow', false);

      return isLive ? (
        <WebBrowserConsumer>
          {(openUrl) => (
            <Touchable
              onPress={() => openUrl('https://apollos.churchonline.org/')}
            >
              <LiveCard isLoading={loading}>
                <CardContent>
                  <ChannelLabel
                    icon="video"
                    label={
                      <UIText>
                        <UIText bold>{`We're live. `}</UIText>
                        Watch now!
                      </UIText>
                    }
                  />
                </CardContent>
              </LiveCard>
            </Touchable>
          )}
        </WebBrowserConsumer>
      ) : null;
    }}
  </Query>
);

export default LiveNowButton;
