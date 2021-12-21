import React from 'react';
import PropTypes from 'prop-types';
import { Image, StatusBar } from 'react-native';

import {
  styled,
  withTheme,
  Icon,
  H1,
  H5,
  PaddedView,
  BackgroundView,
} from '@apollosproject/ui-kit';

import { Slide } from '@apollosproject/ui-onboarding';

const Content = styled({
  flex: 1,
  justifyContent: 'center',
})(PaddedView);

const BrandImage = withTheme(({ theme }) => ({
  source: require('../BrandImage.png'),
  style: {
    resizeMode: 'contain',
    height: theme.sizing.baseUnit * 3,
    width: theme.sizing.baseUnit * 3,
    marginBottom: theme.sizing.baseUnit,
  },
}))(Image);

const Title = styled(({ theme, color }) => ({
  marginBottom: theme.sizing.baseUnit,
  ...(color ? { color } : {}),
}))(H1);

const StyledH5 = styled(({ color }) => ({
  ...(color ? { color } : {}),
}))(H5);

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
        <BrandImage />
        <Title color={textColor}>{slideTitle}</Title>
        <StyledH5 color={textColor}>{description}</StyledH5>
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
