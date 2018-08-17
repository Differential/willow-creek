import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apollos-church-app/src/Providers';

import { Typography } from './Typography';

describe('The Typography placeholder', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Typography />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('translates type styles', () => {
    const customTypeStyles = { fontSize: 24, lineHeight: 32 };

    const tree = renderer.create(
      <Providers>
        <Typography style={customTypeStyles} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
