import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'apolloschurchapp/src/Providers';

import H5 from '.';

describe('the H5 component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <H5>Default H5 text</H5>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <Providers>
        <H5 style={salmon}>Salmon text</H5>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with correct padding', () => {
    const tree = renderer.create(
      <Providers>
        <H5 padded>Padded H5 text</H5>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const tree = renderer.create(
      <Providers>
        <H5 isLoading>Default H5 text</H5>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state with correct positioning (margins)', () => {
    const tree = renderer.create(
      <Providers>
        <H5 padded isLoading>
          Padded H5 text
        </H5>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <Providers>
        <H5 accessible={false}>
          {
            '"Faith does not eliminate questions. But faith knows where to take them." ― Elisabeth Elliot'
          }
        </H5>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
