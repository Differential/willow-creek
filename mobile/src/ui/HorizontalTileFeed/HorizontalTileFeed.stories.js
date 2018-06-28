import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import HorizontalTileFeed from './';

const tileData = [
  {
    id: 'fakeId0',
    title: 'Why Jesus is Timeless',
    meta: {
      date: 'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)', // this snapshot will expire in a year
    },
    content: {
      speaker: 'Marty McFly',
    },
  },
  {
    id: 'fakeId1',
    title: 'Tall Hat Tales',
    meta: {
      date: 'Sat Oct 26 1985 01:24:00 GMT+0008 (UTC)', // this snapshot will expire in a year
    },
    content: {
      speaker: 'A-bro-ham Lincoln',
    },
  },
];

const containerStyles = {
  height: 300,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f7f7f7',
};

storiesOf('HorizontalTileFeed', module)
  .add('Default', () => (
    <View style={containerStyles}>
      <HorizontalTileFeed content={tileData} />
    </View>
  ))
  .add('with Details', () => (
    <View style={containerStyles}>
      <HorizontalTileFeed content={tileData} showTileMeta />
    </View>
  ));
