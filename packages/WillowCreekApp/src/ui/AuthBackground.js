import React from 'react';
import { View } from 'react-native';
import BackgroundImage from './CityBackgroundImage';

export default ({ children }) => (
  <>
    <BackgroundImage />
    {children}
  </>
);
