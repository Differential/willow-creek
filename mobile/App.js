import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { createStackNavigator } from 'react-navigation';
import { Sentry } from 'react-native-sentry';

import ContentFeed from 'content-feed';
import ContentSingle from 'content-single';
import { ThemeProvider } from 'ui/theme';
import Tabs from 'tabs';
import client from 'client';
import Live from 'live';

Sentry.config(
  'https://5908fa19ed37447f86b2717423cadec5:45dd3b58792b413cb67109c5e63a0bb7@sentry.io/1241658'
).install();

const AppNavigator = createStackNavigator(
  {
    Tabs,
    ContentFeed,
    ContentSingle,
    Live,
  },
  {
    initialRouteName: 'Tabs',
  }
);

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
