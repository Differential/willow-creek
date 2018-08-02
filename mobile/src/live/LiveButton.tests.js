import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '/mobile/Providers';

import LiveNowButton from './LiveButton';
import getLiveStream from './getLiveStream.graphql';

const mocks = [
  {
    request: {
      query: getLiveStream,
      variables: {
        isLiveNow: true,
      },
    },
    result: {
      data: {
        liveStream: { isLiveNow: true },
      },
    },
  },
];

it('renders without error', () => {
  const tree = renderer.create(
    <Providers mocks={mocks} addTypename={false}>
      <LiveNowButton isLiveNow />
    </Providers>
  );
  expect(tree).toMatchSnapshot();
});
