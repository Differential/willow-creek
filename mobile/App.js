import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Sentry } from 'react-native-sentry';

import Providers from 'Providers';
import ContentFeed from 'content-feed';
import ContentSingle from 'content-single';
import Tabs from 'tabs';

Sentry.config(
  'https://5908fa19ed37447f86b2717423cadec5:45dd3b58792b413cb67109c5e63a0bb7@sentry.io/1241658'
).install();

const AppNavigator = createStackNavigator(
  {
    Tabs,
    ContentFeed,
    ContentSingle,
  },
  {
    initialRouteName: 'Tabs',
  }
);

const App = () => (
  <Providers>
    <AppNavigator />
  </Providers>
);

export default App;
