import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import SplashScreen from 'react-native-splash-screen';

import httpLink from './httpLink';
import clientStateLink from './clientStateLink';
import authLink from './authLink'; // eslint-disable-line
import cache, { ensureCacheHydration } from './cache';

const link = clientStateLink.concat(ApolloLink.from([authLink, httpLink]));

export const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: true,
});

class ClientProvider extends PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      cache: PropTypes.shape({}),
    }),
  };

  static defaultProps = {
    client,
  };

  async componentDidMount() {
    try {
      await ensureCacheHydration;
    } catch (e) {
      throw e;
    } finally {
      if (SplashScreen && SplashScreen.hide) SplashScreen.hide();
    }
  }

  render() {
    return <ApolloProvider {...this.props} client={client} />;
  }
}

export default ClientProvider;
