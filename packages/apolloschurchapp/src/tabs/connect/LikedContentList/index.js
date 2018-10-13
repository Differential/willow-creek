import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import BackgroundView from 'apolloschurchapp/src/ui/BackgroundView';
import FeedView from 'apolloschurchapp/src/ui/FeedView';

import getLikedContent from '../getLikedContent';
/** A FeedView wrapped in a query to pull content data. */
class LikedContentList extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = () => ({
    title: 'Liked Content',
  });

  static propTypes = {
    /** Functions passed down from React Navigation to use in navigating to/from
     * items in the feed.
     */
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  /** Function that is called when a card in the feed is pressed.
   * Takes the user to the ContentSingle
   */
  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      sharing: item.sharing,
    });

  render() {
    return (
      <BackgroundView>
        <Query query={getLikedContent} fetchPolicy="cache-and-network">
          {({ loading, error, data: { getAllLikedContent = [] }, refetch }) => (
            <FeedView
              initialNumToRender={5}
              content={getAllLikedContent}
              isLoading={loading}
              error={error}
              refetch={refetch}
              onPressItem={this.handleOnPress}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

export default LikedContentList;
