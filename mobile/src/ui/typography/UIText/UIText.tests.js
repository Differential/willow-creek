import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '/mobile/Providers';

import UIText from '.';

describe('the UIText component', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <UIText>Default UIText text</UIText>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as bold', () => {
    const tree = renderer.create(
      <Providers>
        <UIText bold>Bold UIText text</UIText>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as italic', () => {
    const tree = renderer.create(
      <Providers>
        <UIText italic>Italic UIText text</UIText>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as bold italic', () => {
    const tree = renderer.create(
      <Providers>
        <UIText bold italic>
          Bold italic UIText text
        </UIText>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept and render passed in styles', () => {
    const salmon = { color: 'salmon' };
    const tree = renderer.create(
      <Providers>
        <UIText style={salmon}>Salmon text</UIText>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const tree = renderer.create(
      <Providers>
        <UIText isLoading>Default UIText text</UIText>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should accept additional props', () => {
    const tree = renderer.create(
      <Providers>
        <UIText accessible={false}>
          {
            '"You are the only Bible some unbelievers will ever read." – John MacArthur'
          }
        </UIText>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
