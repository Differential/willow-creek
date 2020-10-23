import hoistNonReactStatic from 'hoist-non-react-statics';
import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import RNBootSplash from 'react-native-bootsplash';

import {
  BackgroundView,
  ThemeMixin,
  withTheme,
  NavigationService,
} from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';
import { CoreNavigationAnalytics } from '@apollosproject/ui-analytics';
import { ProtectedRoute } from '@apollosproject/ui-auth';

import Providers from './Providers';
import ContentSingle from './content-single';
import Event from './event';

import EventFeed from './event-feed';
import Tabs from './tabs';
import PersonalDetails from './user-settings/PersonalDetails';
import ChangePassword from './user-settings/ChangePassword';
import Location from './user-settings/Locations';
import LandingScreen from './LandingScreen';
import UserWebBrowser from './user-web-browser';
import Onboarding from './ui/Onboarding';
import AuthBackground from './ui/AuthBackground';
import MediaPlayerYoutube from './ui/MediaPlayerYoutube';
import Auth from './auth';

import NodeSingle from './node-single';

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: theme.barStyle,
  backgroundColor: theme.colors.background.paper,
}))(StatusBar);

const ProtectedRouteWithSplashScreen = (props) => {
  const handleOnRouteChange = () => RNBootSplash.hide({ duration: 250 });

  return <ProtectedRoute {...props} onRouteChange={handleOnRouteChange} />;
};

const EnhancedAuth = (props) => (
  <ThemeMixin mixin={{ type: 'onboarding' }}>
    <Auth BackgroundComponent={AuthBackground} emailRequired {...props} />
  </ThemeMixin>
);
hoistNonReactStatic(EnhancedAuth, Auth);

const PassesWithBrand = (props) => (
  <ThemeMixin mixin={{ buttons: { primary: { accent: 'white' } } }}>
    <Passes {...props} />
  </ThemeMixin>
);

hoistNonReactStatic(PassesWithBrand, Passes);

const AppNavigator = createStackNavigator(
  {
    ProtectedRoute: ProtectedRouteWithSplashScreen,
    Tabs,
    ContentSingle,
    NodeSingle,
    Event,
    Auth: EnhancedAuth,
    PersonalDetails,
    ChangePassword,
    Location,
    Passes: PassesWithBrand,
    EventFeed,
    UserWebBrowser,
    Onboarding,
    LandingScreen,
  },
  {
    initialRouteName: 'ProtectedRoute',
    mode: 'modal',
    headerMode: 'screen',
  }
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar />
      <CoreNavigationAnalytics>
        {(props) => (
          <AppContainer
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            {...props}
          />
        )}
      </CoreNavigationAnalytics>
      <MediaPlayerYoutube />
    </BackgroundView>
  </Providers>
);

export default App;
