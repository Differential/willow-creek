import querystring from 'querystring';
import URL from 'url';
import { Component } from 'react';
import { Linking } from 'react-native';
import OneSignal from 'react-native-onesignal';
import NavigationService from './NavigationService';
import { ONE_SIGNAL_KEY } from './config';

export default class NotificationsInit extends Component {
  static navigationOptions = {};

  componentWillMount() {
    OneSignal.init(ONE_SIGNAL_KEY, {
      kOSSettingsKeyAutoPrompt: true,
    });
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentDidMount() {
    Linking.getInitialURL().then((url) => {
      this.navigate(url);
    });
    Linking.addEventListener('url', ({ url }) => this.navigate(url));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url');
    OneSignal.removeEventListener('received');
    OneSignal.removeEventListener('opened');
    OneSignal.removeEventListener('ids');
  }

  navigate = (rawUrl) => {
    if (!rawUrl) return;
    const url = URL.parse(rawUrl);
    const route = url.pathname.substring(1);
    const args = querystring.parse(url.query);
    NavigationService.navigate(route, args);
  };

  onReceived = (notification) => {
    console.log('Notification received: ', notification);
  };

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    // URL looks like this
    // apolloschurchapp://AppStackNavigator/Connect
    // apolloschurchapp://SomethingElse/Connect
    // apolloschurchapp://SomethingElse/ContentSingle?itemId=SomeItemId:blablalba
    const { url } = openResult.notification.payload.additionalData;
    if (url) {
      this.navigate(url);
    }
  };

  onIds = (device) => {
    console.log('Device info: ', device);
  };

  render() {
    return null;
  }
}
