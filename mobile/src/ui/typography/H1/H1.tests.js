import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '/mobile/Providers';

import H1 from '.';

describe('the H1 component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <H1>Default H1 text</H1>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <Providers>
        <H1 style={salmon}>Salmon text</H1>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with correct padding', () => {
    const tree = renderer.create(
      <Providers>
        <H1 padded>Padded H1 text</H1>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const tree = renderer.create(
      <Providers>
        <H1 isLoading>Default H1 text</H1>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state with correct positioning (margins)', () => {
    const tree = renderer.create(
      <Providers>
        <H1 padded isLoading>
          Padded H1 text
        </H1>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <Providers>
        <H1 accessible={false}>
          {
            '"Do all the good you can. By all the means you can. In all the ways you can. In all theplaces you can. At all the times you can. To all the people you can. As long as ever you can." ― John Wesley'
          }
        </H1>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
