/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import { StyleSheet, ScrollView, View } from 'react-native';
import {
  ConnectedImage,
  GradientOverlayImage,
  PaddedView,
  H1,
  H2,
  H3,
} from '@apollosproject/ui-kit';

import StretchyView from '.';

const imageStyle = { width: '100%', aspectRatio: 1 };

storiesOf('StretchyView', module)
  .add('stretchy as a background', () => (
    <StretchyView>
      {({ Stretchy, ...scrollViewProps }) => (
        <ScrollView {...scrollViewProps}>
          <Stretchy background>
            <GradientOverlayImage
              overlayColor="white"
              overlayType="featured"
              source={{ uri: 'https://picsum.photos/id/233/600/600' }}
              style={imageStyle}
            />
          </Stretchy>
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
  ))
  .add('stretchy as a header', () => (
    <StretchyView>
      {({ Stretchy, ...scrollViewProps }) => (
        <ScrollView {...scrollViewProps}>
          <View>
            <Stretchy>
              <ConnectedImage
                style={imageStyle}
                source={{ uri: 'https://picsum.photos/id/342/600/600' }}
              />
            </Stretchy>
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <H2>Text on top of the stretchy!</H2>
            </View>
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
  ))
  .add('stretchy as a footer', () => (
    <StretchyView>
      {({ Stretchy, ...scrollViewProps }) => (
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
          <Stretchy stretchOn="bottom">
            <ConnectedImage
              style={imageStyle}
              source={{ uri: 'https://picsum.photos/id/342/600/600' }}
            />
          </Stretchy>
        </ScrollView>
      )}
    </StretchyView>
  ))
  .add('multiple stretchies', () => (
    <StretchyView>
      {({ Stretchy, ...scrollViewProps }) => (
        <ScrollView {...scrollViewProps}>
          <Stretchy stretchyKey="header" stretchOn="top">
            <ConnectedImage
              style={imageStyle}
              source={{ uri: 'https://picsum.photos/id/342/600/600' }}
            />
          </Stretchy>
          <PaddedView>
            <H1 padded>Well hello there!</H1>
            <H2 padded>
              Hello there!
              {'\n'}
            </H2>
            <H3 padded>Hello there!</H3>
            <H1 padded>Try to scroll me around.</H1>
          </PaddedView>
          <Stretchy stretchyKey="footer" stretchOn="bottom">
            <ConnectedImage
              style={imageStyle}
              source={{ uri: 'https://picsum.photos/id/342/600/600' }}
            />
          </Stretchy>
        </ScrollView>
      )}
    </StretchyView>
  ));
