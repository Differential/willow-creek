import React from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import { UIText } from '/mobile/ui/typography';
import Card, { CardContent } from '/mobile/ui/Card';
import Touchable from '/mobile/ui/Touchable';
import styled from '/mobile/ui/styled';
import ChannelLabel from '/mobile/ui/ChannelLabel';
import { WebBrowserConsumer } from '/mobile/ui/WebBrowser';

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
