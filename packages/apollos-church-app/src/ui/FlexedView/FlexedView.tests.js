import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apollos-church-app/src/Providers';

import FlexedView from '.';

describe('the FlexedView component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <FlexedView />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
