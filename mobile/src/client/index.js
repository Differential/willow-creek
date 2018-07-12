import React, { PureComponent } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';

import httpLink from './httpLink';
import cache from './cache';

const link = ApolloLink.from([httpLink]);

export const client = new ApolloClient({
  link,
  cache,
  queryDeduplication: true,
});

class ClientProvider extends PureComponent { // eslint-disable-line
  render() {
    return <ApolloProvider {...this.props} client={client} />;
  }
}

export default ClientProvider;
