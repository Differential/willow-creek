import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'TestProviders';

import TileImage from './';

describe('the TileImage component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <TileImage
          image={'https://picsum.photos/600/400/?random'}
          link={'https://github.com'}
          text={'So cool!'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render without text', () => {
    const tree = renderer.create(
      <Providers>
        <TileImage
          image={'https://picsum.photos/600/400/?random'}
          link={'https://github.com'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('passes an onPressItem prop', () => {
    const tree = renderer.create(
      <Providers>
        <TileImage
          image={'https://picsum.photos/600/400/?random'}
          link={'https://github.com'}
          onPressItem={jest.fn}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
