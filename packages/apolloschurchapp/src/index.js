import React from 'react';
import { createStackNavigator } from 'react-navigation';
// import { Sentry } from 'react-native-sentry';

import BackgroundView from 'apolloschurchapp/src/ui/BackgroundView';
import MediaPlayer from 'apolloschurchapp/src/ui/MediaPlayer';

import Providers from './Providers';
import NotificationsInit from './Notifications';
import ContentSingle from './content-single';
import Tabs from './tabs';
import Auth from './auth';

// Sentry.config(
//   'https://5908fa19ed37447f86b2717423cadec5:45dd3b58792b413cb67109c5e63a0bb7@sentry.io/1241658'
// ).install();

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
    <BackgroundView>
      <AppModalNavigator />
      <NotificationsInit />
      <MediaPlayer />
    </BackgroundView>
  </Providers>
);

export default App;
