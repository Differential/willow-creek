import React from 'react';
import renderer from 'react-test-renderer';
// TODO: how to include test for Android?

import Providers from 'WillowCreekApp/src/Providers';

import { WebBrowserConsumer } from '.';

describe(`WebBrowser Provider and Consumer`, () => {
  it('passes a function', async () => {
    renderer.create(
      <Providers>
        <WebBrowserConsumer>
          {(openUrl) => {
            expect(typeof openUrl).toBe('function');
          }}
        </WebBrowserConsumer>
      </Providers>
    );
  });
});
