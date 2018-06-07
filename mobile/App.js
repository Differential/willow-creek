import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ArticleSingle from 'articles/Single';
import { TabStack } from 'tabs';

export const RootStack = createStackNavigator(
  {
    Tab: TabStack,
    ArticleSingle,
  },
  {
    initialRouteName: 'Tab',
    headerMode: 'none',
  }
);

/* eslint-disable */
export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
/* eslint-enable */
