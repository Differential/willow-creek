import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import { HorizontalTileFeed } from '@apollosproject/ui-kit';
import TileImageItem from './TileImageItem';

const TileContentFeed = ({ isLoading, navigation, content = [] }) => (
  <HorizontalTileFeed
    content={content}
    renderItem={({ item }) => (
      <TileImageItem
        item={item}
        isLoading={isLoading}
        navigation={navigation}
      />
    )}
    loadingStateObject={{
      id: 'fake_id',
      title: '',
      coverImage: [],
    }}
    isLoading={isLoading}
  />
);

TileContentFeed.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  isLoading: PropTypes.bool,
  content: PropTypes.arrayOf(
    PropTypes.any // this component doesn't care about the shape of `node`, just that it exists
  ),
};

export default withNavigation(TileContentFeed);
