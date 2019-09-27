import React from 'react';
import renderer from 'react-test-renderer';
import { Platform } from 'react-native';

import Providers from 'WillowCreekApp/src/Providers';

import { WebBrowserConsumer } from '.';

jest.mock('Platform');

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
  it('passes a function (Android)', async () => {
    Platform.OS = 'android';
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
