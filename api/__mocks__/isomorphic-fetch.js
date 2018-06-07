import 'isomorphic-fetch';
import fetch from 'jest-fetch-mock';

import { Constants } from '../src/connectors/rock';

import * as rockMocks from './rock-api-mocks';

const resolveWith = (data) =>
  Promise.resolve(new fetch.Response(JSON.stringify(data)));

fetch.mockRockAPI = () => {
  fetch.mockImplementation((url) => {
    if (!url.match(Constants.ROCK_API)) return Promise.reject();

    if (url.match('api/ContentChannels/\\d')) {
      return resolveWith(rockMocks.contentChannel());
    }

    if (url.match('api/ContentChannels')) {
      return resolveWith([rockMocks.contentChannel()]);
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

    return Promise.reject();
  });
};

export default fetch;
