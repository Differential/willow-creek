import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import {
  FeedView,
  PaddedView,
  BackgroundView,
  ThemeMixin,
} from '@apollosproject/ui-kit';

import { SafeAreaView } from 'react-navigation';
import PageTitle from '../../ui/PageTitle';
import CampusSelectButton from '../../ui/CampusSelectButton';
import OverlayBackgroundImage from '../../ui/OverlayBackgroundImage';
import ContentCardConnected from '../../ui/ContentCardConnected';
import FindCampusAd from '../../ui/FindCampusAd';
import fetchMoreResolver from '../../utils/fetchMoreResolver';

import StretchyView from '../../ui/StretchyView';
import FeaturesFeed from '../../ui/FeaturesFeed';
import CampaignFeed from '../../ui/CampaignFeed';

import GET_FEED from './getFeed';
import GET_USER_CAMPUS from './getUserCampus';

import Icon from './Icon';

class MyWillow extends PureComponent {
  static navigationOptions = {
    tabBarIcon: Icon,
    tabBarLabel: 'My Willow',
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

  renderNoCampusContent = () => <FindCampusAd />;

  renderMyWillowContent() {
    return (
      <BackgroundView>
        <StretchyView
          StretchyComponent={
            <OverlayBackgroundImage
              source={{ uri: 'https://picsum.photos/600/600' }}
            />
          }
        >
          {(scrollViewProps) => (
            <SafeAreaView style={StyleSheet.absoluteFill}>
              <Query
                query={GET_FEED}
                variables={{
                  first: 10,
                  after: null,
                }}
                fetchPolicy="cache-and-network"
              >
                {({ loading, error, data, refetch, fetchMore, variables }) => (
                  <FeedView
                    ListItemComponent={ContentCardConnected}
                    ListHeaderComponent={
                      <>
                        <ThemeMixin mixin={{ type: 'dark' }}>
                          <PaddedView>
                            <PageTitle>My Willow</PageTitle>
                            <CampusSelectButton bordered />
                          </PaddedView>
                        </ThemeMixin>
                        {/*
                          TODO: These two components current exists on both the My Willow and Grow tabs.
                          Their queries need to be adjusted for the proper logic for each tab
                        */}
                        <CampaignFeed onPressItem={this.handleOnPress} />
                        <FeaturesFeed onPressItem={this.handleOnPress} />
                      </>
                    }
                    content={get(data, 'tvFeed.edges', []).map(
                      (edge) => edge.node
                    )}
                    fetchMore={fetchMoreResolver({
                      collectionName: 'tvFeed',
                      fetchMore,
                      variables,
                      data,
                    })}
                    isLoading={loading}
                    error={error}
                    refetch={refetch}
                    onPressItem={this.handleOnPress}
                    {...scrollViewProps}
                  />
                )}
              </Query>
            </SafeAreaView>
          )}
        </StretchyView>
      </BackgroundView>
    );
  }

  render() {
    return (
      <Query query={GET_USER_CAMPUS} fetchPolicy="cache-and-network">
        {({
          data: { currentUser: { profile: { campus } = {} } = {} } = {},
          loading,
        }) =>
          campus || loading
            ? this.renderMyWillowContent()
            : this.renderNoCampusContent()
        }
      </Query>
    );
  }
}

export default MyWillow;
