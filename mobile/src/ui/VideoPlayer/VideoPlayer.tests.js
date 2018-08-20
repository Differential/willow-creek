import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '/mobile/Providers';

import VideoPlayer from '.';

describe('the VideoPlayer component', () => {
  it('should render with a video', () => {
    const tree = renderer.create(
      <Providers>
        <VideoPlayer
          source={{
            uri:
              'http://embed.wistia.com/deliveries/f14c95b710c203f49551373bd37e9685694d6b5b.bin',
          }}
          thumbnail={'https://picsum.photos/600/400/'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render just a thumbnail', () => {
    const tree = renderer.create(
      <Providers>
        <VideoPlayer thumbnail={'https://picsum.photos/600/400/'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render an overlay color', () => {
    const tree = renderer.create(
      <Providers>
        <VideoPlayer
          thumbnail={'https://picsum.photos/600/400/'}
          overlayColor={'salmon'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render a loading state', () => {
    const tree = renderer.create(
      <Providers>
        <VideoPlayer thumbnail={''} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
