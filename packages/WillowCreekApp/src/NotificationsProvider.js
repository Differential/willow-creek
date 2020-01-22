import URL from 'url';
import querystring from 'querystring';
import React, { Component } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';
import { get } from 'lodash';
import OneSignal from 'react-native-onesignal';
import { NotificationsProvider } from '@apollosproject/ui-notifications';
import { resolvers, defaults } from './store';

const UPDATE_DEVICE_PUSH_ID = gql`
  mutation updateDevicePushId($pushId: String!) {
    updateDevicePushId(pushId: $pushId) @client
  }
`;

class NotificationsInit extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    oneSignalKey: PropTypes.string.isRequired,
    navigate: PropTypes.func.isRequired,
    client: PropTypes.shape({
      mutate: PropTypes.func,
      addResolvers: PropTypes.func,
      writeData: PropTypes.func,
      onResetStore: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = {};

  constructor(props) {
    super(props);
    const { client } = props;
    client.addResolvers(resolvers);
    client.writeData({ data: defaults });
    client.onResetStore(() => client.writeData({ data: defaults }));
  }

  componentDidMount() {
    OneSignal.init(this.props.oneSignalKey, {
      kOSSettingsKeyAutoPrompt: false,
    });
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.setSubscription(true);
    Linking.getInitialURL().then((url) => {
      this.navigate(url);
    });
    Linking.addEventListener('url', ({ url }) =>
      this.navigate(url.split('apollos/')[1])
    );
  }

  componentWillUnmount() {
    Linking.removeEventListener('url');
    OneSignal.removeEventListener('received');
    OneSignal.removeEventListener('opened');
    OneSignal.removeEventListener('ids');
  }

  navigate = (rawUrl) => {
    console.warn(rawUrl);
    if (!rawUrl) return;
    const url = URL.parse(rawUrl);
    const route = url.pathname.substring(1);
    const args = querystring.parse(url.query);
    // this.props.navigate(route, args);
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
    const url = get(openResult, 'notification.payload.additionalData.url');
    if (url) {
      this.navigate(url);
    }
  };

  onIds = (device) => {
    this.props.client.mutate({
      mutation: UPDATE_DEVICE_PUSH_ID,
      variables: { pushId: device.userId },
    });
  };

  render() {
    return <NotificationsProvider {...this.props} navigate={() => ({})} />;
  }
}

export default withApollo(NotificationsInit);
