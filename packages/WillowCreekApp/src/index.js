import React from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { BackgroundView, withTheme, ThemeMixin } from '@apollosproject/ui-kit';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';

import Passes from '@apollosproject/ui-passes';
import { ProtectedRoute } from '@apollosproject/ui-auth';
import hoistNonReactStatic from 'hoist-non-react-statics';

import Providers from './Providers';
import NavigationService from './NavigationService';
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

import './bugsnag';

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: 'dark-content',
  backgroundColor: theme.colors.paper,
}))(StatusBar);

const ProtectedRouteWithSplashScreen = (props) => {
  const handleOnRouteChange = () => SplashScreen.hide();

  return <ProtectedRoute {...props} onRouteChange={handleOnRouteChange} />;
};

const AuthWithBackground = (props) => (
  <ThemeMixin mixin={{ type: 'onboarding' }}>
    <Auth BackgroundComponent={AuthBackground} emailRequired {...props} />
  </ThemeMixin>
);

hoistNonReactStatic(AuthWithBackground, Auth);

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
    Auth: AuthWithBackground,
    PersonalDetails,
    ChangePassword,
    Location,
    Passes: PassesWithBrand,
    Event,
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

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

const App = () => (
  <Providers>
    <BackgroundView>
      <AppStatusBar barStyle="dark-content" />
      <AnalyticsConsumer>
        {({ track }) => (
          <AppContainer
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
            onNavigationStateChange={(prevState, currentState) => {
              const currentScreen = getActiveRouteName(currentState);
              const prevScreen = getActiveRouteName(prevState);

              if (prevScreen !== currentScreen) {
                // the line below uses the Google Analytics tracker
                // change the tracker here to use other Mobile analytics SDK.
                track({ eventName: `Viewed ${currentScreen}` });
              }
            }}
          />
        )}
      </AnalyticsConsumer>
      <MediaPlayerYoutube />
    </BackgroundView>
  </Providers>
);

export default App;
