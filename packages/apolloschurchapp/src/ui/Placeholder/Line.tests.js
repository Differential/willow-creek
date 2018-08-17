import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apolloschurchapp/src/Providers';

import { Line } from './Line';

describe('The Line placeholder', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Line />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('accepts width', () => {
    const tree = renderer.create(
      <Providers>
        <Line width="50%" />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('accepts custom styles', () => {
    const customStyle = { backgroundColor: 'salmon' };

    const tree = renderer.create(
      <Providers>
        <Line width="50%" style={customStyle} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
