import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { createStackNavigator } from 'react-navigation';

import ContentFeed from 'content-feed';
import ContentSingle from 'content-single';
import { ThemeProvider } from 'ui/theme';
import Tabs from 'tabs';
import client from 'client';
import Live from 'live';

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
