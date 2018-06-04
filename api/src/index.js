import dotenv from 'dotenv/config'; // eslint-disable-line
import { ApolloServer } from 'apollo-server';

import { resolvers, schema, models } from './data';

import RockConnector from './connectors/rock';

// Construct a context object for each request
const getContext = () => {
  // todo: load user
  const user = null;

  // initialize connectors for every request so API fetches
  // are deduplicated per-request only.
  const connectors = {
    Rock: new RockConnector(),
  };

  const initiatedModels = {};

  const context = {
    user,
    models: initiatedModels,
    connectors,
  };

  Object.keys(models).forEach((modelName) => {
    initiatedModels[modelName] = new models[modelName](context);
  });

  return context;
};

export default new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: getContext,
  formatError: (error) => {
    console.error(error.extensions.exception.stacktrace.join('\n'));
    return error;
  },
});
