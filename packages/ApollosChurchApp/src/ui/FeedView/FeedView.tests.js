import React from 'react';
import renderer from 'react-test-renderer';
import { TouchableWithoutFeedback } from 'react-native';
import { get } from 'lodash';

import Providers from '/mobile/Providers';
import FeedItemCard from '/mobile/ui/FeedItemCard';

import FeedView from '.';

describe('The FeedView component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Providers>
        <FeedView
          content={[
            {
              node: {
                id: '1',
                title: "Will I get to shake Jesus' hand?",
                coverImage: [
                  {
                    uri: 'https://picsum.photos/600/400/?random',
                    width: 600,
                    height: 400,
                  },
                ],
                theme: {
                  isLight: true,
                  colors: {
                    background: {
                      paper: '#fa8072',
                    },
                  },
                },
                parentChannel: {
                  id: '01',
                  name: 'eschatology',
                  iconName: 'like',
                },
              },
            },
            {
              node: {
                id: '2',
                title: 'Where is the new Jerusalem anyways?',
                coverImage: [
                  {
                    uri: 'https://picsum.photos/600/400/?random',
                    width: 600,
                    height: 400,
                  },
                ],
                theme: {
                  isLight: true,
                  colors: {
                    background: {
                      paper: '#e9967a',
                    },
                  },
                },
                parentChannel: {
                  id: '02',
                  name: 'eschatology',
                  iconName: 'like',
                },
              },
            },
          ]}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('renders empty state', () => {
    const tree = renderer.create(
      <Providers>
        <FeedView isLoading content={[]} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('handles a renderItem prop', () => {
    const renderItem = (item) => {
      const theItem = get(item, 'item', {});
      return (
        <TouchableWithoutFeedback>
          <FeedItemCard
            id={theItem.node.id}
            title={theItem.node.title || theItem.node.name || ' '}
            channelType={theItem.node.parentChannel.name}
            channelTypeIcon={theItem.node.parentChannel.iconName}
            images={theItem.node.coverImage.sources}
            isLoading={theItem.node.isLoading}
          />
        </TouchableWithoutFeedback>
      );
    };

    const tree = renderer.create(
      <Providers>
        <FeedView
          isLoading
          content={[
            {
              node: {
                id: '1',
                title: "Will I get to shake Jesus' hand?",
                coverImage: [
                  {
                    uri: 'https://picsum.photos/600/400/?random',
                    width: 600,
                    height: 400,
                  },
                ],
                theme: {
                  isLight: true,
                  colors: {
                    background: {
                      paper: '#fa8072',
                    },
                  },
                },
                parentChannel: {
                  id: '01',
                  name: 'eschatology',
                  iconName: 'like',
                },
              },
            },
          ]}
          renderItem={renderItem}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('passes an onPressItem prop', () => {
    const onPress = () => {};
    const tree = renderer.create(
      <Providers>
        <FeedView isLoading content={[]} onPressItem={onPress} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
