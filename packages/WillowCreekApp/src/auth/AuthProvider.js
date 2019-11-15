import React from 'react';
import PropTypes from 'prop-types';
import {
  AuthProvider,
  GET_LOGIN_STATE as getLoginState,
} from '@apollosproject/ui-auth';
import AsyncStorage from '@react-native-community/async-storage';
import { ApolloConsumer } from 'react-apollo';
import { track } from '@apollosproject/ui-analytics';

import { GET_PUSH_ID, updatePushId } from '@apollosproject/ui-notifications';

import gql from 'graphql-tag';

const GET_AUTH_TOKEN = gql`
  query authToken {
    authToken @client
    authStatus @client
  }
`;

const resolvers = {
  Mutation: {
    handleLogin: async (
      root,
      { authToken, status: authStatus },
      { cache, client }
    ) => {
      try {
        await AsyncStorage.setItem('authToken', authToken);
        await cache.writeQuery({
          query: GET_AUTH_TOKEN,
          data: { authToken, authStatus },
        });
        await cache.writeQuery({
          query: getLoginState,
          data: { isLoggedIn: true },
        });
        await cache.writeData({
          data: { authToken, authStatus },
        });

        const { data: { pushId } = { data: {} } } = await client.query({
          query: GET_PUSH_ID,
        });

        if (pushId) {
          updatePushId({ pushId, client });
        }

        track({ eventName: 'UserLogin', client });
      } catch (e) {
        throw e.message;
      }

      return null;
    },
  },
};

const CustomAuthProvider = ({ children, ...props }) => (
  <AuthProvider {...props}>
    <ApolloConsumer>
      {(client) => {
        client.addResolvers(resolvers);
        return children;
      }}
    </ApolloConsumer>
  </AuthProvider>
);

CustomAuthProvider.propTypes = {
  children: PropTypes.node,
};

export default CustomAuthProvider;
