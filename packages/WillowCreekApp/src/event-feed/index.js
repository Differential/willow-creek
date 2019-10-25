import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { BackgroundView, FeedView } from '@apollosproject/ui-kit';

import EventCard from './EventCard';

import GET_CAMPUS_EVENTS from './getCampusEvents';
/**
 * This is where the component description lives
 * A FeedView wrapped in a query to pull content data.
 */
class ContentFeed extends PureComponent {
  /** Function for React Navigation to set information in the header. */
  static navigationOptions = () => ({
    title: 'Upcoming Events',
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
  handleOnPress = (event) =>
    this.props.navigation.navigate('Event', {
      eventId: event.id,
      sharing: event.sharing,
    });

  render() {
    return (
      <BackgroundView>
        <Query query={GET_CAMPUS_EVENTS} fetchPolicy="cache-and-network">
          {({ loading, error, data, refetch, fetchMore, variables }) => (
            <FeedView
              ListItemComponent={EventCard}
              content={get(data, 'currentUser.profile.campus.events', [])}
              // fetchMore={fetchMoreResolver({
              //   collectionName: 'node.childContentItemsConnection',
              //   fetchMore,
              //   variables,
              //   data,
              // })}
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

export default ContentFeed;