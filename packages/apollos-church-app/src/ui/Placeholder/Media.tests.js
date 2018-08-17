import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apollos-church-app/src/Providers';

import { Media } from './Media';

describe('The Media placeholder', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Media />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('accepts size', () => {
    const tree = renderer.create(
      <Providers>
        <Media size="50%" />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('accepts custom styles', () => {
    const customStyle = { backgroundColor: 'salmon' };

    const tree = renderer.create(
      <Providers>
        <Media style={customStyle} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
