import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { SafeAreaView } from 'react-navigation';
import { BackgroundView, PaddedView, FeedView } from '@apollosproject/ui-kit';

import PageTitle from 'WillowCreekApp/src/ui/PageTitle';
import ContentCardConnected from 'WillowCreekApp/src/ui/ContentCardConnected';
import FeaturesFeed from '../../ui/FeaturesFeed';
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
                ListItemComponent={ContentCardConnected}
                ListHeaderComponent={
                  <>
                    <PaddedView>
                      <PageTitle>Grow</PageTitle>
                    </PaddedView>
                    {/*
                          TODO: These two components current exists on both the My Willow and Grow tabs.
                          Their queries need to be adjusted for the proper logic for each tab
                        */}
                    <CampaignFeed onPressItem={this.handleOnPress} />
                    <FeaturesFeed onPressItem={this.handleOnPress} />
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
