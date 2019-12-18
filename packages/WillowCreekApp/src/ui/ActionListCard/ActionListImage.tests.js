import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'WillowCreekApp/src/Providers';

import ActionListImage from './ActionListImage';

describe('The ActionListImage component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <ActionListImage
          source="https://picsum.photos/800/1600/?random"
          start="2020-02-18T01:00:00Z"
          type="Event"
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render an isLoading state', () => {
    const tree = renderer.create(
      <Providers>
        <ActionListImage
          source="https://picsum.photos/800/1600/?random"
          start="2020-02-18T01:00:00Z"
          type="Event"
          isLoading
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with out an image', () => {
    const tree = renderer.create(
      <Providers>
        <ActionListImage
          source={null}
          start="2020-02-18T01:00:00Z"
          type="Event"
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
