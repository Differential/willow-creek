import { client } from 'client'; // eslint-disable-line
// TODO: this will require more organization...ie...not keeping everything in one file.
// But this is simple while our needs our small.

export const schema = `
  type Query {
    authToken: String
  }

  type Mutation {
    logout
  }
`;

export const defaults = {
  authToken: null,
};

export const resolvers = {
  Mutation: {
    logout: (root, variables, { cache }) => {
      client.resetStore();
      cache.writeData({ data: { authToken: null } });
      return null;
    },
  },
};
