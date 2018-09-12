import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apolloschurchapp/src/Providers';

import Like from '.';

describe('the Share component', () => {
  it('should render a Like', () => {
    const tree = renderer.create(
      <Providers>
        <Like
          itemId={'abc'}
          sessionId={'123'}
          isLiked={false}
          operation={'Like'}
          toggleLike={(data) => data}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });

  it('should render a UnLike', () => {
    const tree = renderer.create(
      <Providers>
        <Like
          itemId={'abc'}
          sessionId={'123'}
          isLiked
          operation={'Unlike'}
          toggleLike={(data) => data}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
