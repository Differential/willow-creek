import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { compose, branch, withProps } from 'recompose';

import CardTile from 'ui/CardTile';
import { withTheme } from 'ui/theme';

import TileFeed from './TileFeed';

export class HorizontalTileFeed extends PureComponent {
  static propTypes = {
    content: PropTypes.array, // eslint-disable-line
    fetchMore: PropTypes.func,
    isLoading: PropTypes.bool,
    keyExtractor: PropTypes.func,
    onPressItem: PropTypes.func,
    renderItem: PropTypes.func,
    showTileMeta: PropTypes.bool,
    theme: PropTypes.shape({}),
  };

  static defaultProps = {
    keyExtractor: (item) => item.id,
    content: [],
    showTileMeta: false,
    isLoading: false,
  };

  getTileWidth = () => {
    const { width } = Dimensions.get('window');
    return width * 0.8; // 80% of width
  };

  renderItem = ({ item, showTileMeta, index }) => (
    <TouchableWithoutFeedback
      onPress={() => this.props.onPressItem({ ...item })}
    >
      <CardTile
        number={index + 1}
        title={item.title}
        showDetails={showTileMeta}
        byLine={item.content.speaker}
        date={item.meta.date}
        isLoading={item.isLoading}
      />
    </TouchableWithoutFeedback>
  );

  render() {
    const {
      content,
      isLoading,
      showTileMeta,
      theme,
      ...otherProps
    } = this.props;
    return (
      <TileFeed
        renderItem={(renderItemProps) =>
          this.props.renderItem ||
          this.renderItem({ ...renderItemProps, showTileMeta })
        }
        data={content}
        horizontal
        initialScrollIndex={0}
        refreshing={isLoading}
        showsHorizontalScrollIndicator={false}
        tileHeight={this.getTileWidth()} // passed into TileFeed styles. Height is equal to 80% of width
        /*
         * `(80% of width - baseUnit / 2)` which is used for padding on the tile. This padding was added
         * to fix a shadow clipping bug on Android. `snapToInterval` below is adjusted to account for
         * that padding on each swipe. TODO: find better shadow clipping fix that simplifies this math.
         */
        snapToInterval={this.getTileWidth() - theme.baseUnit / 2} // passed down to rendered ScrollView.
        snapToAlignment={'start'} // passed down to rendered ScrollView
        decelerationRate={'fast'} // passed down to rendered ScrollView
        {...otherProps}
      />
    );
  }
}

const generateLoadingStateData = (numberOfItems = 1) => {
  const itemData = () => ({
    id: 'fakeId0',
    title: '',
    meta: {
      date: '',
    },
    content: {
      speaker: '',
    },
    isLoading: true,
  });

  const loadingStateData = [itemData()];

  while (loadingStateData.length < numberOfItems) {
    const newData = itemData();
    newData.id = `fakeId${loadingStateData.length}`;
    loadingStateData.push(newData);
  }

  return loadingStateData;
};

const enhance = compose(
  branch(
    ({ isLoading, content }) => isLoading && !content.length,
    withProps({
      content: generateLoadingStateData(5),
      fetchMore: () => {},
    })
  ),
  withTheme(({ theme: { sizing: { baseUnit } = {} } = {} } = {}) => ({
    theme: { baseUnit },
  }))
);

export default enhance(HorizontalTileFeed);
