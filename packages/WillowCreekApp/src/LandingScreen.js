import React from 'react';
import { StyleSheet } from 'react-native';
import { styled, ConnectedImage } from '@apollosproject/ui-kit';

import ApollosLandingScreen from './ui/LandingScreen';

const FullScreenImage = styled({
  resizeMode: 'cover',
  ...StyleSheet.absoluteFill,
})(ConnectedImage);

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
