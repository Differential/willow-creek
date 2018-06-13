import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ArticleSingle from 'articles/Single';
import { ThemeProvider } from 'ui/theme';
import { TabStack } from 'tabs';
import LiveNowModal from 'live/liveModal';

export const RootStack = createStackNavigator(
  {
    Tab: TabStack,
    ArticleSingle,
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
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    );
  }
}
/* eslint-enable */
