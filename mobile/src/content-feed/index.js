import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import BackgroundView from '/mobile/ui/BackgroundView';
import FeedView from '/mobile/ui/FeedView';

import getContentFeed from './getContentFeed.graphql';

class ContentFeed extends PureComponent {
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

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      itemTitle: item.title,
    });

  render() {
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', []);
    return (
      <BackgroundView>
        <Query query={getContentFeed} variables={{ itemId }}>
          {({ loading, error, data, refetch }) => (
            <FeedView
              content={get(
                data,
                'node.childContentItemsConnection.edges',
                []
              ).map((edge) => edge.node)}
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
