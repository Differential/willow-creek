import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apolloschurchapp/src/Providers';
import { H5 } from 'apolloschurchapp/src/ui/typography';
import { withIsLoading } from 'apolloschurchapp/src/ui/isLoading';

import BlockQuote from '.';

describe('the BlockQuote component', () => {
  it('should render a string', () => {
    const tree = renderer.create(
      <Providers>
        <BlockQuote>
          {
            '"You are the only Bible some unbelievers will ever read." – John MacArthur'
          }
        </BlockQuote>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render child components', () => {
    const tree = renderer.create(
      <Providers>
        <BlockQuote>
          <H5>
            {
              '"You are the only Bible some unbelievers will ever read." – John MacArthur'
            }
          </H5>
        </BlockQuote>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const BlockQuoteLoadingState = withIsLoading(BlockQuote);
    const tree = renderer.create(
      <Providers>
        <BlockQuoteLoadingState isLoading>
          {
            '"You are the only Bible some unbelievers will ever read." – John MacArthur'
          }
        </BlockQuoteLoadingState>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
