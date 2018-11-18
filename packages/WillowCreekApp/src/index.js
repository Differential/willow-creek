import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation';
// import { Sentry } from 'react-native-sentry';

import { BackgroundView, withTheme } from '@apollosproject/ui-kit';
import MediaPlayer from 'WillowCreekApp/src/ui/MediaPlayer';
import Providers from './Providers';
import NavigationService from './NavigationService';
import ContentSingle from './content-single';
import Tabs from './tabs';
import Auth from './auth';
import PersonalDetails from './user-settings/PersonalDetails';
import ChangePassword from './user-settings/ChangePassword';

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: 'dark-content',
  backgroundColor: theme.colors.paper,
}))(StatusBar);

const AppNavigator = createStackNavigator(
  {
    Tabs,
    ContentSingle,
    Auth,
    PersonalDetails,
    ChangePassword,
  },
  {
    initialRouteName: 'Tabs',
    mode: 'modal',
    headerMode: 'screen',
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
      <MediaPlayer />
    </BackgroundView>
  </Providers>
);

export default App;
