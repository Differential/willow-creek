import fetch from 'jest-fetch-mock';

import { Constants } from 'apollos-church-api/src/connectors/rock';
import * as apolloDatasourceMocks from './apollo-datasource-mocks';
import * as rockMocks from './rock-api-mocks';

const apolloServerEnv = require.requireActual('apollo-server-env');

// eslint-disable-next-line
const Response = apolloServerEnv.Response;

const resolveWith = (data, url) =>
  Promise.resolve(
    new Response(JSON.stringify(data), {
      url,
      status: 200,
      statusText: 'OK',
      headers: new apolloServerEnv.Headers({
        'Content-Type': 'application/json',
      }),
    })
  );

fetch.mockLiveDataSourceApis = () => {
  fetch.mockImplementation((request) => {
    if (request.url.match('/api/v1/events/current')) {
      return resolveWith(apolloDatasourceMocks.liveStreamLive(), request.url);
    }
    if (request.url.match('api.scripture.api.bible')) {
      return resolveWith(apolloDatasourceMocks.Scripture(), request.url);
    }
    return Promise.reject();
  });
};

fetch.mockRockDataSourceAPI = () => {
  fetch.mockImplementation((request) => {
    let { url } = request;
    url = decodeURI(url);
    if (!url.match(Constants.ROCK_API)) {
      if (request.url.match('/api.scripture.api.bible/v1')) {
        return resolveWith(apolloDatasourceMocks.Scripture());
      }
      return Promise.reject();
    }

    if (url.match('api/EntityTypes')) {
      return resolveWith(
        [
          {
            Id: 201,
          },
        ],
        url
      );
    }

    if (url.match('api/InteractionChannels')) {
      return resolveWith(
        [
          {
            Id: 10,
          },
        ],
        url
      );
    }

    if (url.match('api/InteractionComponents')) {
      return resolveWith(
        [
          {
            Id: 101,
          },
        ],
        url
      );
    }

    if (url.match('api/ContentChannels/\\d')) {
      return resolveWith(rockMocks.contentChannel());
    }

    if (url.match('api/ContentChannels')) {
      return resolveWith([rockMocks.contentChannel()]);
    }

    if (url.match('api/ContentChannelItems/test-case-no-attributes')) {
      const mock = rockMocks.contentItem();
      mock.AttributeValues = {};
      mock.Attributes = {};
      return resolveWith(mock);
    }

    if (url.match('api/ContentChannelItems/123')) {
      const contentItem = rockMocks.contentItem();
      contentItem.AttributeValues.Scriptures = { Value: 'John 3:16' };
      return resolveWith(contentItem);
    }

    if (url.match('api/ContentChannelItems/\\d')) {
      return resolveWith(rockMocks.contentItem());
    }

    if (url.match('api/ContentChannelItems')) {
      return resolveWith([rockMocks.contentItem()]);
    }

    if (url.match('api/ContentChannelItemAssociations')) {
      return resolveWith([rockMocks.contentChannelItemAssociation()]);
    }

    if (url.match('api/Auth/Login')) {
      const body = JSON.parse(request.body);
      const response = new Response('');
      if (body.Password === 'good') {
        response.headers.set('set-cookie', 'some cookie');
        return Promise.resolve(response);
      }
      return Promise.reject({ ...response, status: 401 });
    }

    if (url.match('api/People/GetCurrentPerson')) {
      return resolveWith(rockMocks.people());
    }

    if (url.match('api/People/\\d')) {
      return resolveWith(rockMocks.people());
    }

    if (url.match('api/People')) {
      if (request.method === 'POST') {
        const { Email } = JSON.parse(request.body);
        if (!Email) {
          const response = new Response('');
          response.status = 400;
          return Promise.reject(response);
        }
        return resolveWith({ personId: 35 });
      }

      return resolveWith([rockMocks.people()]);
    }

    if (url.match('api/Interactions/\\d')) {
      return resolveWith(rockMocks.interaction());
    }

    if (url.match('api/Interactions')) {
      if (request.method === 'GET') {
        return resolveWith([rockMocks.interaction()]);
      }
      if (request.method === 'POST') {
        const response = new Response('456', {
          status: 200,
          statusText: 'OK',
          headers: new apolloServerEnv.Headers({
            'Content-Type': 'application/json',
          }),
        });
        return Promise.resolve(response);
      }
    }

    if (url.match('api/InteractionSessions')) {
      if (request.method === 'GET') {
        return resolveWith(rockMocks.session());
      }
      if (request.method === 'POST') {
        const response = new Response('123', {
          status: 200,
          statusText: 'OK',
          headers: new apolloServerEnv.Headers({
            'Content-Type': 'application/json',
          }),
        });
        return Promise.resolve(response);
      }
    }

    if (url.match('api/UserLogins')) {
      if (request.method === 'POST') {
        const { UserName } = JSON.parse(request.body);
        if (!UserName) {
          const response = new Response('');
          response.status = 400;
          return Promise.reject(response);
        }
        return resolveWith({ id: 21 });
      }
      const identity = url // identity = UserName
        .split('eq')
        .pop()
        .trim(' '); // EXAMPLE URL: /api/UserLogins?$filter=UserName eq 'isaac.hardy@newspring.cc'

      if (!identity) {
        const response = new Response('');
        response.status = 400;
        return Promise.reject(response);
      }
      if (identity === `'isaac.hardy@newspring.cc'`)
        return resolveWith([rockMocks.userLogins()]);

      return resolveWith([]);
    }
    console.log(`No route matching ${url}`);
    return Promise.reject(`No route matching ${url}`);
  });
};

const apolloServerEnvMocked = {
  ...apolloServerEnv,
  Response: fetch.Response,
  fetch,
};

module.exports = apolloServerEnvMocked;
