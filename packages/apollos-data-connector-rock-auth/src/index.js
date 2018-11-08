import { gql } from 'apollo-server';
import { createGlobalId } from '@apollosproject/server-core';
import { get } from 'lodash';
import { registerToken } from './token';

export { authSchema as schema } from '@apollosproject/data-schema';
export { default as dataSource } from './data-source';

export const contextMiddleware = ({ req, context: ctx }) => {
  if (get(req, 'headers.authorization')) {
    const { userToken, rockCookie, sessionId } = registerToken(
      req.headers.authorization
    );
    if (sessionId) {
      return {
        ...ctx,
        userToken,
        rockCookie,
        sessionId,
      };
    }
  }
  return ctx;
};

export const resolver = {
  Query: {
    currentUser: (root, args, { dataSources }) =>
      dataSources.Auth.getCurrentPerson(),
  },
  AuthenticatedUser: {
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(id, parentType.name),
    profile: (authUser) => authUser,
  },
  Authentication: {
    user: (root, args, { dataSources }) => dataSources.Auth.getCurrentPerson(),
  },
  Mutation: {
    authenticate: (root, { identity, password }, { dataSources }) =>
      dataSources.Auth.authenticate({ identity, password }),
    changePassword: (root, { password }, { dataSources }) =>
      dataSources.Auth.changePassword({ password }),
    registerPerson: (root, args, { dataSources }) =>
      dataSources.Auth.registerPerson(args),
  },
};
