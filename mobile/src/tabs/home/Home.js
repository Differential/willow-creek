import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { withTheme } from '/mobile/ui/theme';
import FeedView from '/mobile/ui/FeedView';
import BackgroundView from '/mobile/ui/BackgroundView';

import { LiveButton } from '../../live';

import getUserFeed from './getUserFeed.graphql';

// TODO: what are our thoughts around using this @-syntax for HOCs?
@withTheme(({ theme, ...otherProps }) => ({
  headerBackgroundColor: theme.colors.background.primary,
  headerTintColor: theme.colors.background.paper,
  ...otherProps,
}))
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
      itemTitle: item.title,
    });

  render() {
    return (
      <BackgroundView>
        <Query query={getUserFeed}>
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

export default Home;
