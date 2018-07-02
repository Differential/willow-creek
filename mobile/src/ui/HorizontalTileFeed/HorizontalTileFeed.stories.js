import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import CardTile from 'ui/CardTile';
import TileImage from 'ui/TileImage';

import HorizontalTileFeed from './';

const loadingStateObject = {
  node: {
    id: 'fakeId0',
    title: '',
    isLoading: true,
  },
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
  <CardTile
    number={index + 1}
    title={item.node.title}
    isLoading={item.node.isLoading}
  />
);

storiesOf('HorizontalTileFeed', module)
  .add('With CardTile', () => {
    const CardTileData = [
      {
        node: {
          id: 'fakeId0',
          title: 'Why Jesus is Timeless',
        },
      },
      {
        node: {
          id: 'fakeId1',
          title: 'Tall Hat Tales',
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
        node: {
          id: 'fakeId0',
          source: 'https://picsum.photos/300/300/?random',
          link: 'https://github.com',
        },
      },
      {
        node: {
          id: 'fakeId1',
          source: 'https://picsum.photos/300/300/?random',
          link: 'https://github.com',
        },
      },
      {
        node: {
          id: 'fakeId2',
          source: 'https://picsum.photos/300/300/?random',
          link: 'https://github.com',
        },
      },
    ];

    const renderTileImage = (
      { item, index } //eslint-disable-line
    ) => (
      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <TileImage image={item.node.source} link={item.node.link} />
      </View>
    );

    return (
      <View style={containerStyles}>
        <HorizontalTileFeed
          content={imageData}
          renderItem={renderTileImage}
          loadingStateObject={{
            node: {
              id: 'fakeId1',
              source: '',
              link: '',
            },
          }}
        />
      </View>
    );
  });
