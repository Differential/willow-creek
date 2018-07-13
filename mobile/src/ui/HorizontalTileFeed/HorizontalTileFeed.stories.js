import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import styled from 'ui/styled';
import CardTile from 'ui/CardTile';
import TileImage from 'ui/TileImage';

import HorizontalTileFeed from '.';

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

    const loadingStateObject = {
      node: {
        id: 'fakeId0',
        title: '',
        isLoading: true,
      },
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

    return (
      <View>
        <HorizontalTileFeed
          content={CardTileData}
          renderItem={renderCardTile}
          loadingStateObject={loadingStateObject}
        />
      </View>
    );
  })
  .add('CardTile Skeleton', () => {
    const loadingStateObject = {
      node: {
        id: 'fakeId0',
        title: '',
        isLoading: true,
      },
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

    return (
      <View>
        <HorizontalTileFeed
          content={[]}
          renderItem={renderCardTile}
          loadingStateObject={loadingStateObject}
          isLoading
        />
      </View>
    );
  })
  .add('With TileImage', () => {
    const imageData = [
      {
        node: {
          id: 'fakeId0',
          source: 'https://picsum.photos/900/900/?random',
          link: 'https://github.com',
        },
      },
      {
        node: {
          id: 'fakeId1',
          source: 'https://picsum.photos/900/900/?random',
          link: 'https://github.com',
        },
      },
      {
        node: {
          id: 'fakeId2',
          source: 'https://picsum.photos/900/900/?random',
          link: 'https://github.com',
        },
      },
    ];

    const loadingStateImageObject = {
      node: {
        id: 'fakeId1',
        source: '',
        link: '',
      },
    };

    const Spacer = styled({
      flex: 1,
      paddingHorizontal: 10,
    })(View);

    const renderTileImage = (
      { item, index } //eslint-disable-line
    ) => (
      <Spacer>
        <TileImage image={item.node.source} link={item.node.link} />
      </Spacer>
    );

    return (
      <View>
        <HorizontalTileFeed
          content={imageData}
          renderItem={renderTileImage}
          loadingStateObject={loadingStateImageObject}
        />
      </View>
    );
  });
