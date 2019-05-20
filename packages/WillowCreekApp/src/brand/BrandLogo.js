import React from 'react';
import { Image } from 'react-native';

export default ({ width = 50, height =50, ...props}) => (
  <Image style={{ width, height }} {...props} source={require('./brand-logo.png')} />
)