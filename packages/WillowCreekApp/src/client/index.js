import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHookProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Observable } from 'apollo-link';
import { getVersion, getApplicationName } from 'react-native-device-info';

import { authLink } from '@apollosproject/ui-auth';
import { onError } from 'apollo-link-error';

import { NavigationService } from '@apollosproject/ui-kit';
import { AsyncStorage } from 'react-native';
import { resolvers, schema, defaults } from '../store';
import bugsnag from '../bugsnag';
import campusLink from './campusLink';

import httpLink from './httpLink';
import cache, { ensureCacheHydration } from './cache';
import MARK_CACHE_LOADED from './markCacheLoaded';

const goToAuth = () => NavigationService.resetToAuth();
const wipeData = () => cache.writeData({ data: defaults });

let clearStore;
let storeIsResetting = false;
const onAuthError = async (e) => {
  if (!storeIsResetting) {
    const authToken = await AsyncStorage.getItem('authToken');
    bugsnag.notify(new Error('Client Auth Error'), (report) => {
      report.metadata = { // eslint-disable-line
        Details: { authToken, ...e },
      };
    });
    AsyncStorage.removeItem('authToken');
    storeIsResetting = true;
    await clearStore();
  }
  storeIsResetting = false;
  goToAuth();
};

// No async functions in `onError`, what a shame.
// https://github.com/apollographql/apollo-link/issues/646#issuecomment-479966447
// https://github.com/apollographql/apollo-link/pull/1066
const promiseToObservable = (promise) =>
  new Observable((subscriber: any) => {
    promise.then(
      (value) => {
        if (subscriber.closed) return;
        subscriber.next(value);
        subscriber.complete();
      },
      (err) => subscriber.error(err)
    );
  });

const buildErrorLink = (func) =>
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      return promiseToObservable(
        Promise.all(
          graphQLErrors.map(async (error) => {
            const {
              extensions: { code },
            } = error;
            // wipe out all data and go somewhere
            if (code === 'UNAUTHENTICATED') {
              await func(error);
            }
            return null;
          })
        )
      );
    }
    if (networkError) return null;
    return null;
  });

const errorLink = buildErrorLink(onAuthError);

const link = ApolloLink.from([authLink, campusLink, errorLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: false,
  shouldBatch: true,
  resolvers,
  typeDefs: schema,
  name: getApplicationName(),
  version: getVersion(),
});

// Hack to give auth link access to method on client;
// eslint-disable-next-line prefer-destructuring
clearStore = client.clearStore.bind(client);

wipeData();
// Ensure that media player still works after logout.
client.onClearStore(async () => {
  const ret = await wipeData();
  return ret;
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
      client.mutate({ mutation: MARK_CACHE_LOADED });
    }
  }

  render() {
    const { children, ...otherProps } = this.props;
    return (
      <ApolloProvider {...otherProps} client={client}>
        <ApolloHookProvider {...otherProps} client={client}>
          {children}
        </ApolloHookProvider>
      </ApolloProvider>
    );
  }
}

export default ClientProvider;
