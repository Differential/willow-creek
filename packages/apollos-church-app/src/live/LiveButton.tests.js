import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apollos-church-app/src/Providers';

import LiveNowButton from './LiveButton';
import getLiveStream from './getLiveStream.graphql';

const mocks = [
  {
    request: {
      query: getLiveStream,
      variables: {
        isLive: true,
      },
    },
    result: {
      data: {
        liveStream: { isLive: true },
      },
    },
  },
];

it('renders without error', () => {
  const tree = renderer.create(
    <Providers mocks={mocks} addTypename={false}>
      <LiveNowButton isLive />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});
