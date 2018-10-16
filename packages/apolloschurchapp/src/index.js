import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation';
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

const AppNavigator = createStackNavigator(
  {
    Tabs,
    ContentSingle,
    Auth,
    UserSettings,
    LikedContentList,
    PersonalDetails,
    ChangePassword,
  },
  {
    initialRouteName: 'Tabs',
    mode: 'modal',
    headerMode: 'none',
  }
);

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar barStyle="dark-content" />
      <AppNavigator
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
