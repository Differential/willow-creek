import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';

import {
  styled,
  withTheme,
  Icon,
  H1,
  H4,
  PaddedView,
  BackgroundView,
} from '@apollosproject/ui-kit';

import { Slide } from '@apollosproject/ui-onboarding';

const Content = styled({
  flex: 1,
  justifyContent: 'center',
})(PaddedView);

const BrandIcon = withTheme(({ theme, color }) => ({
  name: 'brand-icon',
  size: theme.sizing.baseUnit * 3,
  ...(color ? { fill: color } : {}),
  style: {
    marginBottom: theme.sizing.baseUnit,
  },
}))(Icon);

const Title = styled(({ theme, color }) => ({
  marginBottom: theme.sizing.baseUnit * 2,
  ...(color ? { color } : {}),
}))(H1);

const StyledH4 = styled(({ color }) => ({
  ...(color ? { color } : {}),
}))(H4);

const LandingScreen = ({
  slideTitle,
  description,
  textColor,
  BackgroundComponent,
  ...props
}) => (
  <BackgroundView>
    <StatusBar
      barStyle="light-content"
      backgroundColor={'transparent'}
      translucent
    />
    <Slide {...props} scrollEnabled={false}>
      {BackgroundComponent}
      <Content>
        <BrandIcon color={textColor} />
        <Title color={textColor}>{slideTitle}</Title>
        <StyledH4 color={textColor}>{description}</StyledH4>
      </Content>
    </Slide>
  </BackgroundView>
);

LandingScreen.propTypes = {
  /* The `Swiper` component used in `<onBoarding>` looks for and hijacks the title prop of it's
   * children. Thus we have to use more unique name.
   */
  slideTitle: PropTypes.string,
  description: PropTypes.string,
  textColor: PropTypes.string, // Use for custom text and `BrandIcon` color when overlaying text on an image or video needs more clarity. Defaults to theme driven colors.
  /* Recommended usage:
   * - `Image` (react-native)
   * - `GradientOverlayImage` (@apollosproject/ui-kit) for increased readability
   * - `Video` (react-native-video) because moving pictures!
   */
  BackgroundComponent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

LandingScreen.defaultProps = {
  slideTitle: "We're glad you're here.",
  description:
    'At Willow we seek to connect with God in deeper ways and to grow in our relationships with Him and with one another.',
};

LandingScreen.navigationOptions = {
  header: null,
};

export default LandingScreen;
