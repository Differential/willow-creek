import React from 'react';
import renderer from 'react-test-renderer';

import { ScrollView, View } from 'react-native';
import {
  ConnectedImage,
  GradientOverlayImage,
  PaddedView,
  H1,
  H2,
  H3,
} from '@apollosproject/ui-kit';
import Providers from '../Providers';

import StretchyView from '.';

const imageStyle = { width: '100%', aspectRatio: 1 };

describe('the StretchyView component', () => {
  it('should render as a background', () => {
    const tree = renderer.create(
      <Providers>
        <StretchyView
          StretchyComponent={
            <GradientOverlayImage
              overlayColor="white"
              overlayType="featured"
              source={{ uri: 'https://picsum.photos/600/600' }}
              style={imageStyle}
            />
          }
        >
          {(scrollViewProps) => (
            <ScrollView {...scrollViewProps}>
              <PaddedView>
                <H1 padded>Well hello there!</H1>
                <H2 padded>
                  Hello there!
                  {'\n'}
                </H2>
                <H3 padded>Hello there!</H3>
                <H1 padded>Try to scroll me around.</H1>
              </PaddedView>
            </ScrollView>
          )}
        </StretchyView>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as a header', () => {
    const tree = renderer.create(
      <Providers>
        <StretchyView
          StretchyComponent={
            <ConnectedImage
              style={imageStyle}
              source={{ uri: 'https://picsum.photos/600/600' }}
            />
          }
        >
          {({ stretchyHeight, ...scrollViewProps }) => (
            <ScrollView {...scrollViewProps}>
              <View
                style={{
                  height: stretchyHeight,
                }}
              >
                <H2>Text on top of the stretchy!</H2>
              </View>
              <PaddedView>
                <H1 padded>Well hello there!</H1>
                <H2 padded>
                  Hello there!
                  {'\n'}
                </H2>
                <H3 padded>Hello there!</H3>
                <H1 padded>Try to scroll me around.</H1>
              </PaddedView>
            </ScrollView>
          )}
        </StretchyView>
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
