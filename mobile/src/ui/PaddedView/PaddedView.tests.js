import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'Providers';

import PaddedView from '.';

describe('the PaddedView component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <PaddedView />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
