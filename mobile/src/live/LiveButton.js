import React from 'react';

import { UIText } from 'ui/typography';
import Card, { CardContent } from 'ui/Card';
import Touchable from 'ui/Touchable';
import styled from 'ui/styled';
import ChannelLabel from 'ui/ChannelLabel';
import { WebBrowserConsumer } from 'ui/WebBrowser';

const LiveCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.lightSecondary,
}))(Card);

const LiveNowButton = () => (
  <WebBrowserConsumer>
    {(openUrl) => (
      <Touchable onPress={() => openUrl('https://apollos.churchonline.org/')}>
        <LiveCard>
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
);

export default LiveNowButton;
