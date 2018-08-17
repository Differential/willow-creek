import { AppRegistry, YellowBox } from 'react-native';

import App from './src';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
]);
AppRegistry.registerComponent('apolloschurchapp', () => App);
