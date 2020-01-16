import './polyfill'; // this can be removed when we upgrade to react-native 59
import './loadConfig';
import './src/bugsnag';

import { AppRegistry, YellowBox } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import ApollosConfig from '@apollosproject/config';
import Storybook from './storybook';

const useStorybook = ApollosConfig.STORYBOOK === 'true';

const MainApp = require('./src');

let App = MainApp;
if (useStorybook) {
  App = Storybook;
}

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);

AppRegistry.registerComponent('WillowCreekApp', () => App);
