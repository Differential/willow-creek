import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'Providers';

import H6 from '.';

describe('the H6 component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <H6>Default H6 text</H6>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <Providers>
        <H6 style={salmon}>Salmon text</H6>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with correct padding', () => {
    const tree = renderer.create(
      <Providers>
        <H6 padded>Padded H6 text</H6>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const tree = renderer.create(
      <Providers>
        <H6 isLoading>Default H6 text</H6>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state with correct positioning (margins)', () => {
    const tree = renderer.create(
      <Providers>
        <H6 padded isLoading>
          Padded H6 text
        </H6>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <Providers>
        <H6 accessible={false}>
          {
            '"Radical obedience to Christ is not easy... It\'s not comfort, not health, not wealth, and not prosperity in this world. Radical obedience to Christ risks losing all these things. But in the end, such risk finds its reward in Christ. And he is more than enough for us." ― David Platt'
          }
        </H6>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
