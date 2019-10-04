import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { View, SafeAreaView, StatusBar } from 'react-native';

import {
  FeedView,
  BackgroundView,
  TouchableScale,
  FeaturedCard,
  ThemeMixin,
  PaddedView,
  StretchyView,
  styled,
} from '@apollosproject/ui-kit';

import fetchMoreResolver from '../../utils/fetchMoreResolver';
import ContentCardConnected from '../../ui/ContentCardConnected';
import PageTitle from '../../ui/PageTitle';
import CampusSelectButton from '../../ui/CampusSelectButton';
import OverlayBackgroundImage from '../../ui/OverlayBackgroundImage';
import Icon from './Icon';

import Features from './Features';
import GET_USER_FEED from './getUserFeed';
import GET_CAMPAIGN_CONTENT_ITEM from './getCampaignContentItem';

const BackgroundFill = styled(({ theme }) => ({
  height: 44,
  backgroundColor: theme.colors.secondary,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
}))(View);

class Home extends PureComponent {
  static navigationOptions = () => ({
    header: null,
    tabBarIcon: Icon,
    tabBarLabel: 'My Willow',
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      setParams: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  render() {
    return (
      <BackgroundView>
        <SafeAreaView style={{ flex: 1 }}>
          <BackgroundFill />
          <View style={{ flex: 1 }}>
            <StretchyView>
              {({ Stretchy, ...scrollViewProps }) => (
                <Query
                  query={GET_USER_FEED}
                  variables={{
                    first: 10,
                    after: null,
                  }}
                  fetchPolicy="cache-and-network"
                >
                  {({
                    loading,
                    error,
                    data,
                    refetch,
                    fetchMore,
                    variables,
                  }) => (
                    <FeedView
                      {...scrollViewProps}
                      ListItemComponent={ContentCardConnected}
                      content={get(data, 'userFeed.edges', []).map(
                        (edge) => edge.node
                      )}
                      fetchMore={fetchMoreResolver({
                        collectionName: 'userFeed',
                        fetchMore,
                        variables,
                        data,
                      })}
                      isLoading={loading}
                      error={error}
                      refetch={refetch}
                      ListHeaderComponent={
                        <>
                          <Stretchy background>
                            <OverlayBackgroundImage
                              style={{ aspectRatio: 0.9 }}
                            />
                          </Stretchy>
                          <ThemeMixin mixin={{ type: 'dark' }}>
                            <PaddedView>
                              <PageTitle>My Willow</PageTitle>
                              <CampusSelectButton bordered />
                            </PaddedView>
                          </ThemeMixin>
                          <Query
                            query={GET_CAMPAIGN_CONTENT_ITEM}
                            fetchPolicy="cache-and-network"
                          >
                            {({
                              data: featuredData,
                              loading: isFeaturedLoading,
                            }) => {
                              const featuredContent = get(
                                featuredData,
                                'campaigns.edges',
                                []
                              ).map((edge) => edge.node);

                              const featuredItem = get(
                                featuredContent[0],
                                'childContentItemsConnection.edges[0].node',
                                {}
                              );

                              return (
                                <TouchableScale
                                  onPress={() =>
                                    this.handleOnPress({ id: featuredItem.id })
                                  }
                                >
                                  <ContentCardConnected
                                    Component={FeaturedCard}
                                    contentId={featuredItem.id}
                                    isLoading={isFeaturedLoading}
                                  />
                                </TouchableScale>
                              );
                            }}
                          </Query>
                          <Features navigation={this.props.navigation} />
                        </>
                      }
                      onPressItem={this.handleOnPress}
                    />
                  )}
                </Query>
              )}
            </StretchyView>
          </View>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Home;
