import React, { PureComponent } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Sentry } from 'react-native-sentry';
import SplashScreen from 'react-native-splash-screen';

import Providers from 'Providers';
import ContentSingle from 'content-single';
import Tabs from 'tabs';
import Auth from 'auth';

Sentry.config(
  'https://5908fa19ed37447f86b2717423cadec5:45dd3b58792b413cb67109c5e63a0bb7@sentry.io/1241658'
).install();

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

class App extends PureComponent {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Providers>
        <AppModalNavigator />
      </Providers>
    );
  }
}

export default App;
