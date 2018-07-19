import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import TabView, { SceneMap } from '.';

const styles = StyleSheet.create({
  firstRoute: { flex: 1, backgroundColor: '#ff4081' }, // eslint-disable-line
  secondRoute: { flex: 1, backgroundColor: '#673ab7' }, // eslint-disable-line
});

const FirstRoute = () => <View style={styles.firstRoute} />;
const SecondRoute = () => <View style={styles.SecondRoute} />;

storiesOf('TabView', module).add('default', () => (
  <View style={StyleSheet.absoluteFill}>
    <TabView
      routes={[
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ]}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      })}
    />
  </View>
));
