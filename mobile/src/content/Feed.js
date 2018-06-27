import React from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import BackgroundView from 'ui/BackgroundView';
import FeedView from 'ui/FeedView';
import GET_CONTENT_FEED from './feedQuery';

export class ContentFeed extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const itemTitle = navigation.getParam('itemTitle', 'Content Channel');
    return {
      title: itemTitle,
    };
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  onPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.node.id,
      itemTitle: item.node.title,
    });

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', []);
    return (
      <BackgroundView>
        <Query query={GET_CONTENT_FEED} variables={{ itemId }}>
          {({ loading, error, data, refetch }) => (
            <FeedView
              content={get(data, 'node.childContentItemsConnection.edges', [])}
              isLoading={loading}
              error={error}
              refetch={refetch}
              onPressItem={this.onPress}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

export default ContentFeed;
