import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'TestProviders';

import CardTile from 'ui/CardTile';

import HorizontalTileFeed from './';

const loadingStateObject = {
  id: 'fakeId0',
  title: '',
  isLoading: true,
};

describe('The HorizontalTileFeed component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <HorizontalTileFeed
          content={[
            {
              id: 'fakeId0',
              title: 'Why Jesus is Timeless',
            },
            {
              id: 'fakeId1',
              title: 'Why Jesus is Timeless',
            },
          ]}
          renderItem={({ item, index }) => (
            <CardTile
              number={index + 1}
              title={item.title}
              isLoading={item.isLoading}
            />
          )}
          loadingStateObject={loadingStateObject}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders empty state', () => {
    const tree = renderer.create(
      <Providers>
        <HorizontalTileFeed
          isLoading
          content={[]}
          renderItem={({ item, index }) => (
            <CardTile
              number={index + 1}
              title={item.title}
              isLoading={item.isLoading}
            />
          )}
          loadingStateObject={loadingStateObject}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
