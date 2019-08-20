import React from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { BackgroundView, withTheme, ThemeMixin } from '@apollosproject/ui-kit';
import Badge from '@apollosproject/ui-kit/src/theme/icons/Badge';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Passes from '@apollosproject/ui-passes';
import Auth, { ProtectedRoute } from '@apollosproject/ui-auth';
import hoistNonReactStatic from 'hoist-non-react-statics';

import Providers from './Providers';
import NavigationService from './NavigationService';
import ContentSingle from './content-single';
import Tabs from './tabs';
import PersonalDetails from './user-settings/PersonalDetails';
import ChangePassword from './user-settings/ChangePassword';
import Location from './user-settings/Locations';
import LandingScreen from './LandingScreen';
import UserWebBrowser from './user-web-browser';
import Onboarding from './ui/Onboarding';
import AuthBackground from './ui/AuthBackground';
import MediaPlayerYoutube from './ui/MediaPlayerYoutube';

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
    <Auth BackgroundComponent={AuthBackground} {...props} />
  </ThemeMixin>
);

hoistNonReactStatic(AuthWithBackground, Auth);

const PassesWithBrand = (props) => (
  <ThemeMixin mixin={{ buttons: { primary: { accent: 'white' } } }}>
    <Passes {...props} />
  </ThemeMixin>
);

hoistNonReactStatic(PassesWithBrand, Passes);

const customIcons = { Badge };

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
  <Providers iconInput={customIcons}>
    <BackgroundView>
      <AppStatusBar barStyle="dark-content" />
      <AppContainer
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
      <MediaPlayerYoutube />
    </BackgroundView>
  </Providers>
);

export default App;
