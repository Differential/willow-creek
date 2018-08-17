import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apollos-church-app/src/Providers';

import LoginForm from './Form';

describe('The LoginForm component', () => {
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
