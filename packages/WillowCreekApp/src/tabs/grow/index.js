import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { BackgroundView, PaddedView } from '@apollosproject/ui-kit';
import PageTitle from 'WillowCreekApp/src/ui/PageTitle';

import Icon from './Icon';

const Grow = () => (
  <BackgroundView>
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <ScrollView>
        <PaddedView vertical={false}>
          <PageTitle padded>Grow</PageTitle>
        </PaddedView>
      </ScrollView>
    </SafeAreaView>
  </BackgroundView>
);

Grow.navigationOptions = {
  tabBarIcon: Icon,
  tabBarLabel: 'GROW',
};

export default Grow;
