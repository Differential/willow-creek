import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import CardTile from 'ui/CardTile';
import TileImage from 'ui/TileImage';

import HorizontalTileFeed from './';

const loadingStateObject = {
  id: 'fakeId0',
  title: '',
  meta: {
    date: '',
  },
  content: {
    speaker: '',
  },
  isLoading: true,
};

const containerStyles = {
  // height: 300,
  // justifyContent: 'center',
  // alignItems: 'center',
  backgroundColor: '#f7f7f7',
};

const renderCardTile = (
  { item, index } //eslint-disable-line
) => (
  <CardTile number={index + 1} title={item.title} isLoading={item.isLoading} />
);

storiesOf('HorizontalTileFeed', module)
  .add('With CardTile', () => {
    const CardTileData = [
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

    return (
      <View style={containerStyles}>
        <HorizontalTileFeed
          content={CardTileData}
          renderItem={renderCardTile}
          loadingStateObject={loadingStateObject}
        />
      </View>
    );
  })
  .add('CardTile Skeleton', () => (
    <View style={containerStyles}>
      <HorizontalTileFeed
        content={[]}
        renderItem={renderCardTile}
        loadingStateObject={loadingStateObject}
        isLoading
      />
    </View>
  ))
  .add('With TileImage', () => {
    const imageData = [
      {
        id: 'fakeId0',
        source: 'https://picsum.photos/300/300/?random',
        link: 'https://github.com',
      },
      {
        id: 'fakeId1',
        source: 'https://picsum.photos/300/300/?random',
        link: 'https://github.com',
      },
      {
        id: 'fakeId2',
        source: 'https://picsum.photos/300/300/?random',
        link: 'https://github.com',
      },
    ];

    const renderTileImage = (
      { item, index } //eslint-disable-line
    ) => (
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <TileImage image={item.source} link={item.link} />
      </View>
    );

    return (
      <View style={containerStyles}>
        <HorizontalTileFeed
          content={imageData}
          renderItem={renderTileImage}
          loadingStateObject={{
            id: 'fakeId1',
            source: '',
            link: '',
          }}
        />
      </View>
    );
  });
