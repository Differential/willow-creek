import { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import { ONE_SIGNAL_KEY } from './config';

export default class NotificationsInit extends Component {
  componentWillMount() {
    OneSignal.init(ONE_SIGNAL_KEY, {
      kOSSettingsKeyAutoPrompt: true,
    });
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (notification) => {
    console.log('Notification received: ', notification);
  };

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  };

  onIds = (device) => {
    console.log('Device info: ', device);
  };

  render() {
    return null;
  }
}
