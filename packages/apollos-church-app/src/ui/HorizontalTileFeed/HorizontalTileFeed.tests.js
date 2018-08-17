import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '/mobile/Providers';
import CardTile from '/mobile/ui/CardTile';

import HorizontalTileFeed from '.';

const loadingStateObject = {
  node: {
    id: 'fakeId0',
    title: '',
    isLoading: true,
  },
};

describe('The HorizontalTileFeed component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <HorizontalTileFeed
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
          renderItem={({ item, index }) => (
            <CardTile
              number={index + 1}
              title={item.node.title}
              isLoading={item.node.isLoading}
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
              title={item.node.title}
              isLoading={item.node.isLoading}
            />
          )}
          loadingStateObject={loadingStateObject}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
