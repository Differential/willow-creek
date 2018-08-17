import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apollos-church-app/src/Providers';

import CenteredView from '.';

describe('the CenteredView component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <CenteredView />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
