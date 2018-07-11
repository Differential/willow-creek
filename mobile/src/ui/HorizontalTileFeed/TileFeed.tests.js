import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'TestProviders';
import CardTile from 'ui/CardTile';

import TileFeed from './';

describe('The TileFeed component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <TileFeed
          content={[
            {
              node: {
                id: 'fakeId0',
                title: 'Why Jesus is Timeless',
              },
            },
            {
              node: {
                id: 'fakeId1',
                title: 'Why Jesus is Timeless',
              },
            },
          ]}
          loadingStateObject={{
            id: 'fakeId0',
            title: '',
            isLoading: false,
          }}
          renderItem={({ item, index }) => (
            <CardTile
              number={index + 1}
              title={item.title}
              isLoading={item.isLoading}
            />
          )}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders empty state', () => {
    const tree = renderer.create(
      <Providers>
        <TileFeed
          refreshing
          content={[]}
          loadingStateObject={{
            id: 'fakeId0',
            title: '',
            isLoading: true,
          }}
          renderItem={({ item, index }) => (
            <CardTile
              number={index + 1}
              title={item.title}
              isLoading={item.isLoading}
            />
          )}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
