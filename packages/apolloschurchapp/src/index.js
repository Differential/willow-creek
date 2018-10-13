import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';
// import { Sentry } from 'react-native-sentry';

import BackgroundView from 'apolloschurchapp/src/ui/BackgroundView';
import MediaPlayer from 'apolloschurchapp/src/ui/MediaPlayer';
import { withTheme } from 'apolloschurchapp/src/ui/theme';

import Providers from './Providers';
import NotificationsInit from './Notifications';
import NavigationService from './NavigationService';
import ContentSingle from './content-single';
import UserSettings from './user-settings';
import PersonalDetails from './user-settings/PersonalDetails';
import ChangePassword from './user-settings/ChangePassword';
import LikedContentList from './tabs/connect/LikedContentList';
import Tabs from './tabs';
import Auth from './auth';

// Sentry.config(
//   'https://5908fa19ed37447f86b2717423cadec5:45dd3b58792b413cb67109c5e63a0bb7@sentry.io/1241658'
// ).install();

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: 'dark-content',
  backgroundColor: theme.colors.paper,
}))(StatusBar);

const AppStackNavigator = createStackNavigator(
  {
    Tabs,
    ContentSingle,
    UserSettings,
    LikedContentList,
  },
  {
    initialRouteName: 'Tabs',
  }
);

const AppModalNavigator = createStackNavigator(
  {
    AppStackNavigator,
    Auth,
    PersonalDetails,
    ChangePassword,
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
      <AppStatusBar />
      <AppModalNavigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
      <NotificationsInit />
      <MediaPlayer />
    </BackgroundView>
  </Providers>
);

export default App;
