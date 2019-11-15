import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get, flatten } from 'lodash';
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
  FlexedView,
} from '@apollosproject/ui-kit';
import FindCampusAd from '../../ui/FindCampusAd';

import fetchMoreResolver from '../../utils/fetchMoreResolver';
import ContentCardConnected from '../../ui/ContentCardConnected';
import PageTitle from '../../ui/PageTitle';
import CampusSelectButton from '../../ui/CampusSelectButton';
import CampusBackgroundImage from '../../ui/CampusBackgroundImage';
import Icon from './Icon';

import Features from './Features';
import GET_USER_FEED from './getUserFeed';
import GET_CAMPAIGN_CONTENT_ITEM from './getCampaignContentItem';
import GET_USER_CAMPUS from './getUserCampus';

const BackgroundFill = styled(({ theme }) => ({
  height: 44,
  backgroundColor: theme.colors.secondary,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
}))(View);

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

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
      // Android only styles
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  refetchFeatures = () => ({});

  refetchCampaign = () => ({});

  renderNoCampusContent = () => <FindCampusAd />;

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  renderMyWillowContent() {
    return (
      <BackgroundView>
        <FlexedSafeAreaView>
          <BackgroundFill />
          <FlexedView>
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
                    refetch: refetchFeed,
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
                      refetch={() =>
                        Promise.all([
                          refetchFeed(),
                          this.refetchFeatures(),
                          this.refetchCampaign(),
                        ])
                      }
                      ListHeaderComponent={
                        <>
                          <Stretchy background>
                            <CampusBackgroundImage />
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
                              refetch: refetchCampaign,
                            }) => {
                              this.refetchCampaign = refetchCampaign;
                              const featuredContent = flatten(
                                get(featuredData, 'campaigns.edges', [])
                                  .map((edge) => edge.node)
                                  .filter((node) =>
                                    get(
                                      node,
                                      'childContentItemsConnection.edges.length'
                                    )
                                  )
                                  .map(
                                    (node) =>
                                      node.childContentItemsConnection.edges
                                  )
                              );

                              const featuredItem = get(
                                featuredContent,
                                '[0].node',
                                null
                              );

                              if (!featuredItem) return null;

                              return (
                                <TouchableScale
                                  onPress={() =>
                                    this.handleOnPress({
                                      id: featuredItem.id,
                                    })
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
                          <Features
                            navigation={this.props.navigation}
                            refetchRef={(refetch) =>
                              (this.refetchFeatures = refetch)
                            }
                          />
                        </>
                      }
                      onPressItem={this.handleOnPress}
                    />
                  )}
                </Query>
              )}
            </StretchyView>
          </FlexedView>
        </FlexedSafeAreaView>
      </BackgroundView>
    );
  }

  render() {
    return (
      <Query query={GET_USER_CAMPUS} fetchPolicy="cache-and-network">
        {({
          loading,
          data: { currentUser: { profile: { campus } = {} } = {} } = {},
        }) =>
          !campus && !loading
            ? this.renderNoCampusContent()
            : this.renderMyWillowContent()
        }
      </Query>
    );
  }
}

export default Home;
