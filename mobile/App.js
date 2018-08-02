import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Sentry } from 'react-native-sentry';

import Providers from '/mobile/Providers';
import ContentSingle from '/mobile/content-single';
import Tabs from '/mobile/tabs';
import Auth from '/mobile/auth';

Sentry.config(
  'https://5908fa19ed37447f86b2717423cadec5:45dd3b58792b413cb67109c5e63a0bb7@sentry.io/1241658'
).install();

const AppStackNavigator = createStackNavigator(
  {
    Tabs,
    ContentSingle,
  },
  {
    initialRouteName: 'Tabs',
  }
);

const AppModalNavigator = createStackNavigator(
  {
    AppStackNavigator,
    Auth,
  },
  {
    initialRouteName: 'AppStackNavigator',
    mode: 'modal',
    headerMode: 'none',
  }
);

const App = () => (
  <Providers>
    <AppModalNavigator />
  </Providers>
);

export default App;
