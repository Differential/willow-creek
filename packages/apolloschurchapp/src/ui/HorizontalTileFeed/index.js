import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';

import { withTheme } from 'apolloschurchapp/src/ui/theme';

import TileFeed from './TileFeed';

export class HorizontalTileFeed extends PureComponent {
  static propTypes = {
    content: PropTypes.array, // eslint-disable-line
    loadingStateObject: PropTypes.shape({}).isRequired,
    renderItem: PropTypes.func.isRequired,
    fetchMore: PropTypes.func,
    isLoading: PropTypes.bool,
    keyExtractor: PropTypes.func,
    theme: PropTypes.shape({}),
  };

  static defaultProps = {
    keyExtractor: (item) => item && item.id,
    content: [],
    isLoading: false,
  };

  constructor(props) {
    super(props);

    this.snapToInterval = this.getTileWidth() - this.props.theme.baseUnit / 2; //eslint-disable-line
  }

  getTileWidth = () => {
    const { width } = Dimensions.get('window');
    return width * 0.8; // 80% of width
  };

  render() {
    const { content, isLoading, renderItem, theme, ...otherProps } = this.props;

    return (
      <TileFeed
        data={content}
        horizontal
        initialScrollIndex={0}
        refreshing={isLoading}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        tileHeight={this.getTileWidth()} // passed into TileFeed styles. Height is equal to 80% of width
        /*
         * `(80% of width - baseUnit / 2)` which is used for padding on the tile. This padding was added
         * to fix a shadow clipping bug on Android. `snapToInterval` below is adjusted to account for
         * that padding on each swipe. TODO: find better shadow clipping fix that simplifies this math.
         */
        snapToInterval={this.snapToInterval} // passed down to rendered ScrollView.
        snapToAlignment={'start'} // passed down to rendered ScrollView
        decelerationRate={'fast'} // passed down to rendered ScrollView
        {...otherProps}
      />
    );
  }
}

const generateLoadingStateData = (loadingStateObject, numberOfItems) => {
  const itemData = () => JSON.parse(JSON.stringify(loadingStateObject));

  const loadingStateData = [];

  while (loadingStateData.length < numberOfItems) {
    const newData = itemData();
    newData.id = `fakeId${loadingStateData.length}`;
    loadingStateData.push(newData);
  }

  return loadingStateData;
};

const enhance = compose(
  withProps(
    ({ isLoading, content, loadingStateObject } = {}) =>
      isLoading && (!content || !content.length)
        ? {
            content: generateLoadingStateData(loadingStateObject, 5),
            fetchMore: () => {},
          }
        : {}
  ),
  withTheme(({ theme: { sizing: { baseUnit } = {} } = {} } = {}) => ({
    theme: { baseUnit },
  }))
);

export default enhance(HorizontalTileFeed);
