import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apolloschurchapp/src/Providers';

import { LayoutConsumer } from '.';

describe(`LayoutContext Provider and Consumer`, () => {
  it('provides safeAreaInsets', async () => {
    renderer.create(
      <Providers>
        <LayoutConsumer>
          {({ safeAreaInsets }) => {
            expect(safeAreaInsets).toMatchSnapshot();
          }}
        </LayoutConsumer>
      </Providers>
    );
  });
});
