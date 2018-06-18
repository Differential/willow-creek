import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { createStackNavigator } from 'react-navigation';
import ArticleSingle from 'articles/Single';
import ContentSingle from 'content/Single';
import { ThemeProvider } from 'ui/theme';
import { TabStack } from 'tabs';
import client from 'client';
import LiveNowModal from 'live/liveModal';

export const RootStack = createStackNavigator(
  {
    Tab: TabStack,
    ArticleSingle,
    ContentSingle,
    LiveNowModal,
  },
  {
    mode: 'modal',
    initialRouteName: 'Tab',
  }
);

/* eslint-disable */
export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider>
          <RootStack />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
/* eslint-enable */
