import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import getLikedContent from '../getLikedContent';
import RecentlyLikedTileFeed from './RecentlyLikedTileFeed';

const RecentlyLikedTileFeedConnected = ({ navigation }) => (
  <Query query={getLikedContent} fetchPolicy="cache-and-network">
    {({ loading, data: { getAllLikedContent = [] } = {} }) => {
      if (!getAllLikedContent.length) return null;
      return (
        <RecentlyLikedTileFeed
          id={'liked'}
          content={getAllLikedContent}
          isLoading={loading}
          navigation={navigation}
          loadingStateObject={{
            isLoading: true,
          }}
        />
      );
    }}
  </Query>
);

RecentlyLikedTileFeedConnected.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }),
};

export default RecentlyLikedTileFeedConnected;
