import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { styled, GradientOverlayImage } from '@apollosproject/ui-kit';

import ApollosLandingScreen from './ui/LandingScreen';

const FullScreenImage = styled({
  resizeMode: 'cover',
  position: 'absolute',
})(GradientOverlayImage);

const LandingScreen = ({ navigation }) => (
  <ApollosLandingScreen
    onPressPrimary={() => navigation.push('Auth')}
    textColor={'white'}
    BackgroundComponent={
      <FullScreenImage
        source={require('./ui/CityBackgroundImage/onboarding_bg.png')}
        ImageComponent={Image}
      />
    }
    primaryNavText={"Let's go!"}
  />
);

LandingScreen.navigationOptions = {
  header: null,
};

LandingScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default LandingScreen;
