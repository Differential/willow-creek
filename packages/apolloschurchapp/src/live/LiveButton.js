import React from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import { UIText } from 'apolloschurchapp/src/ui/typography';
import Card, { CardContent } from 'apolloschurchapp/src/ui/Card';
import Touchable from 'apolloschurchapp/src/ui/Touchable';
import styled from 'apolloschurchapp/src/ui/styled';
import ChannelLabel from 'apolloschurchapp/src/ui/ChannelLabel';
import { WebBrowserConsumer } from 'apolloschurchapp/src/ui/WebBrowser';

import getLiveStream from './getLiveStream.graphql';

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
                        <UIText bold>{`We're live.`} </UIText>
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
