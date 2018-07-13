import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'Providers';

import ChannelLabel from '.';

describe('the ChannelLabel component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <ChannelLabel label={'Default'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a skeleton view', () => {
    const tree = renderer.create(
      <Providers>
        <ChannelLabel label={'Default'} isLoading />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with an icon', () => {
    const tree = renderer.create(
      <Providers>
        <ChannelLabel label={'Default'} icon={'like'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a skeleton view that supports an icon', () => {
    const tree = renderer.create(
      <Providers>
        <ChannelLabel label={'Default'} icon={'like'} isLoading />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render flexed', () => {
    const tree = renderer.create(
      <Providers>
        <ChannelLabel label={'Default'} withFlex />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
