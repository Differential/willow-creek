import { gql } from 'apollo-server';
import { createGlobalId } from '../node';

// export { default as model } from './model';
export { default as dataSource } from './data-source';

export const schema = gql`
  type AuthenticatedUser {
    id: ID!
    profile: Person
  }

  type Authentication {
    user: AuthenticatedUser
    token: String
  }

  extend type Mutation {
    authenticate(identity: String!, password: String!): Authentication
    changePassword(password: String!): Authentication
    registerPerson(email: String!, password: String!): Authentication
  }

  extend type Query {
    currentUser: AuthenticatedUser
  }
`;

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
