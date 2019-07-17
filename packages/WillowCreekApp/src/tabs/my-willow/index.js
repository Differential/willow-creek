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
import fetchMoreResolver from '../../utils/fetchMoreResolver';

import StretchyView from '../../ui/StretchyView';
import FeaturedCampaign from './FeaturedCampaign';

import GET_FEED from './getTVFeed';

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

  render() {
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
}

export default MyWillow;
