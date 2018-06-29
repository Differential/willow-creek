import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'TestProviders';

import LoginForm from './';

describe('The LoginForm component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <LoginForm />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
