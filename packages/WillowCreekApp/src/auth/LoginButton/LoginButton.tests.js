import React from 'react';
import renderer from 'react-test-renderer';
import wait from 'waait';

import Providers from 'WillowCreekApp/src/Providers';

import getLoginState from '../getLoginState';

import LoginButton from '.';

describe('LoginButton component', () => {
  it('renders nothing when logged in', async () => {
    const mock = {
      request: {
        query: getLoginState,
      },
      result: {
        data: { isLoggedIn: true },
      },
    };

    const navigation = { navigate: jest.fn() };
    const tree = renderer.create(
      <Providers mocks={[mock]}>
        <LoginButton navigation={navigation} />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });

  it('renders a LoginButton when logged out', async () => {
    const mock = {
      request: {
        query: getLoginState,
      },
      result: {
        data: { isLoggedIn: null },
      },
    };

    const navigation = { navigate: jest.fn() };
    const tree = renderer.create(
      <Providers mocks={[mock]}>
        <LoginButton navigation={navigation} />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });

  it('renders a LoginButton that is loading', async () => {
    const mock = {
      request: {
        query: getLoginState,
      },
      result: {
        data: { isLoggedIn: null },
      },
    };

    const navigation = { navigate: jest.fn() };
    const tree = renderer.create(
      <Providers mocks={[mock]}>
        <LoginButton navigation={navigation} loading />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
});
