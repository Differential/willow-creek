import dotenv from 'dotenv/config'; // eslint-disable-line
import { get } from 'lodash';
import { models } from './data';

import RockConnector from './connectors/rock';

// Construct a context object for each request
export default ({ req = {} } = {}) => {
  // initialize connectors for every request so API fetches
  // are deduplicated per-request only.
  const connectors = {
    Rock: new RockConnector(),
  };

  const initiatedModels = {};

  const context = {
    models: initiatedModels,
    connectors,
  };

  Object.keys(models).forEach((modelName) => {
    initiatedModels[modelName] = new models[modelName](context);
  });

  if (get(req, 'headers.authorization')) {
    initiatedModels.Auth.registerToken(req.headers.authorization);
  }

  return context;
};
