import React from 'react';
import { styled } from '@apollosproject/ui-kit';
import { Image } from 'react-native';

export const BackgroundImage = styled({
  position: 'absolute',
  width: '100%',
  height: '100%',
})((props) => <Image {...props} source={require('./onboarding_bg.png')} />);

export default BackgroundImage;
