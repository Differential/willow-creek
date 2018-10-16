import dotenv from 'dotenv/config'; // eslint-disable-line
import { get } from 'lodash';

import { registerToken } from './data/auth/token';

import { models } from './data';

// Construct a context object for each request
export default ({ req = {} } = {}) => {
  // initialize connectors for every request so API fetches
  // are deduplicated per-request only.
  const connectors = {};

  const initiatedModels = {};

  const context = {
    models: initiatedModels,
    connectors,
  };

  Object.keys(models).forEach((modelName) => {
    if (models[modelName]) {
      initiatedModels[modelName] = new models[modelName](context);
    }
  });

  if (get(req, 'headers.authorization')) {
    const { userToken, rockCookie, sessionId } = registerToken(
      req.headers.authorization
    );
    if (sessionId) {
      context.userToken = userToken;
      context.rockCookie = rockCookie;
      context.sessionId = sessionId;
    }
  }

  return context;
};
