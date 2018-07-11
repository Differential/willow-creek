import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import { UIText } from 'ui/typography';
import Card, { CardContent } from 'ui/Card';
import Touchable from 'ui/Touchable';
import styled from 'ui/styled';
import ChannelLabel from 'ui/ChannelLabel';

const LiveCard = styled(({ theme }) => ({
  backgroundColor: theme.colors.lightSecondary,
}))(Card);

const LiveNowButton = (props) => (
  <Touchable onPress={() => props.navigation.navigate('Live')}>
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
);

LiveNowButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default withNavigation(LiveNowButton);
