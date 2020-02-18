import URL from 'url';
import querystring from 'querystring';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import OneSignal from 'react-native-onesignal';
import { NotificationsProvider } from '@apollosproject/ui-notifications';
import gql from 'graphql-tag';

class NotificationsInit extends NotificationsProvider {
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
    Linking.addEventListener('url', ({ url }) => this.navigate(url));
    this.props.client.onClearStore(() =>
      OneSignal.getPermissionSubscriptionState(({ userId }) => {
        this.props.client.mutate({
          mutation: gql`
            mutation updateDevicePushId($pushId: String!) {
              updateDevicePushId(pushId: $pushId) @client
            }
          `,
          variables: { pushId: userId },
        });
      })
    );
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
    const cleanedRoute = route.includes('/app-link/')
      ? route
      : route.split('app-link/')[1];
    const args = querystring.parse(url.query);
    this.props.navigate(cleanedRoute, args);
  };
}

export default withApollo(NotificationsInit);
