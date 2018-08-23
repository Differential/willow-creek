import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { withTheme } from 'apolloschurchapp/src/ui/theme';
import FeedView from 'apolloschurchapp/src/ui/FeedView';
import BackgroundView from 'apolloschurchapp/src/ui/BackgroundView';

import { LiveButton } from '../../live';

import getUserFeed from './getUserFeed';

class Home extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: 'Apollos Church',
    headerStyle: {
      backgroundColor: navigation.getParam('backgroundColor'),
    },
    headerTintColor: navigation.getParam('tintColor'),
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
    headerBackgroundColor: PropTypes.string,
    headerTintColor: PropTypes.string,
  };

  constructor(props) {
    super(props);

    props.navigation.setParams({
      backgroundColor: props.headerBackgroundColor,
      tintColor: props.headerTintColor,
    });
  }

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      sharing: item.sharing,
    });

  render() {
    return (
      <BackgroundView>
        <Query query={getUserFeed} fetchPolicy="cache-and-network">
          {({ loading, error, data, refetch }) => (
            <FeedView
              content={get(data, 'userFeed.edges', []).map((edge) => edge.node)}
              isLoading={loading}
              error={error}
              refetch={refetch}
              ListHeaderComponent={LiveButton}
              onPressItem={this.handleOnPress}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

export default withTheme(({ theme, ...otherProps }) => ({
  headerBackgroundColor: theme.colors.primary,
  headerTintColor: theme.colors.background.paper,
  ...otherProps,
}))(Home);
