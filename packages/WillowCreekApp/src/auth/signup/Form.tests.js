import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'WillowCreekApp/src/Providers';

import LoginForm from './Form';

describe('The SignupForm component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <LoginForm
          values={{ email: '', password: '' }}
          touched={{ email: false, password: false }}
          errors={{ email: null, password: null }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
