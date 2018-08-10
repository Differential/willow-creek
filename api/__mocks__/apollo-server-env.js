import fetch from 'jest-fetch-mock';

import * as apolloDatasourceMocks from './apollo-datasource-mocks';

const apolloServerEnv = require.requireActual('apollo-server-env');

const resolveWith = (data, url) =>
  Promise.resolve(
    new apolloServerEnv.Response(JSON.stringify(data), {
      url,
      status: 200,
      statusText: 'OK',
      headers: new apolloServerEnv.Headers({
        'Content-Type': 'application/json',
      }),
    })
  );

fetch.mockDataSourceApis = () => {
  fetch.mockImplementation((request) => {
    if (request.url.match('/api/v1/events/current')) {
      return resolveWith(apolloDatasourceMocks.liveStreamLive(), request.url);
    }
    if (request.url.match('/passage/html')) {
      return resolveWith(apolloDatasourceMocks.ESVScripture(), request.url);
    }
    return Promise.reject();
  });
};

const apolloServerEnvMocked = {
  ...apolloServerEnv,
  fetch,
};

module.exports = apolloServerEnvMocked;
