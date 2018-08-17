import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apolloschurchapp/src/Providers';
import { withIsLoading } from 'apolloschurchapp/src/ui/isLoading';
import { H5 } from 'apolloschurchapp/src/ui/typography';

import BulletListItem from '.';

describe('the BulletListItem component', () => {
  it('should render a string', () => {
    const tree = renderer.create(
      <Providers>
        <BulletListItem>
          {`"God's work done in God's way will never lack God's supplies." – Hudson Taylor`}
        </BulletListItem>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render render child components', () => {
    const tree = renderer.create(
      <Providers>
        <BulletListItem>
          <H5>
            {`"God's work done in God's way will never lack God's supplies." – Hudson Taylor`}
          </H5>
        </BulletListItem>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const BulletListLoadingState = withIsLoading(BulletListItem);
    const tree = renderer.create(
      <Providers>
        <BulletListLoadingState isLoading>
          {`"God's work done in God's way will never lack God's supplies." – Hudson Taylor`}
        </BulletListLoadingState>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
