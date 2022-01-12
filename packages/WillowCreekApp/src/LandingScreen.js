import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { styled } from '@apollosproject/ui-kit';

import ApollosLandingScreen from './ui/LandingScreen';

const FullScreenImage = styled({
  resizeMode: 'cover',
  height: '100%',
  width: '100%',
  ...StyleSheet.absoluteFill,
})(Image);

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

export default LandingScreen;
