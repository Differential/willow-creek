import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { SafeAreaView } from 'react-navigation';
import { BackgroundView, PaddedView, FeedView } from '@apollosproject/ui-kit';

import ContentCardConnected from 'WillowCreekApp/src/ui/ContentCardConnected';
import PageTitle from 'WillowCreekApp/src/ui/PageTitle';
import FeaturesFeed from '../home/Features';
import CampaignFeed from '../../ui/CampaignFeed';
import getUserFeed from './getUserFeed';
import Icon from './Icon';

class Grow extends Component {
  static navigationOptions = {
    tabBarIcon: Icon,
    tabBarLabel: 'Grow',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  render() {
    return (
      <BackgroundView>
        <SafeAreaView
          forceInset={{ top: 'always', bottom: 'never' }}
          style={StyleSheet.absoluteFill}
        >
          <Query query={getUserFeed} fetchPolicy="cache-and-network">
            {({ loading, error, data, refetch }) => (
              <FeedView
                ListItemComponent={({ id }) => (
                  <ContentCardConnected contentId={id} />
                )}
                ListHeaderComponent={
                  <>
                    <PaddedView>
                      <PageTitle>Grow</PageTitle>
                    </PaddedView>
                    <CampaignFeed
                      type="growCampaign"
                      onPressItem={this.handleOnPress}
                    />
                    <FeaturesFeed navigation={this.props.navigation} />
                  </>
                }
                content={get(data, 'userFeed.edges', []).map(
                  (edge) => edge.node
                )}
                isLoading={loading}
                error={error}
                refetch={refetch}
                onPressItem={this.handleOnPress}
              />
            )}
          </Query>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Grow;
