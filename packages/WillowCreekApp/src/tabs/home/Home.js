import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { get, flatten } from 'lodash';
import PropTypes from 'prop-types';

import { View, SafeAreaView, StatusBar } from 'react-native';

import {
  fetchMoreResolver,
} from '@apollosproject/ui-connected';

import {
  styled,
  FeedView,
  BackgroundView,
  TouchableScale,
  Touchable,
  FeaturedCard,
  PaddedView,
  styled,
  FlexedView,
  H2,
} from '@apollosproject/ui-kit';
import FindCampusAd from '../../ui/FindCampusAd';

import ContentCardConnected from '../../ui/ContentCardConnected';
import CampusSelectButton from '../../ui/CampusSelectButton';
import Icon from './Icon';


import Features from './Features';
import GET_USER_FEED from './getUserFeed';
import GET_CAMPAIGN_CONTENT_ITEM from './getCampaignContentItem';
import GET_USER_CAMPUS from './getUserCampus';

const ThemedStatusBar = styled(
  ({ theme }) => ({
    backgroundColor: theme.colors.paper,
  }),
  'Home.ThemedStatusBar'
)(StatusBar);

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);

const CampusTouchableRow = styled(({ theme }) => ({
  opacity: theme.alpha.medium,
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit / 2,
}))(View);

const CampusTouchable = (
  { onPress, ...props } // eslint-disable-line
) => (
  <Touchable onPress={onPress}>
    <CampusTouchableRow {...props} />
  </Touchable>
);

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
    // this produces a smoother transition when the app launches or comes from on boarding
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('dark-content');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  refetchFeatures = () => ({});

  renderNoCampusContent = () => <FindCampusAd />;

  handleOnPress = (item) =>
    this.props.navigation.navigate('ContentSingle', {
      itemId: item.id,
      transitionKey: item.transitionKey,
    });

  renderMyWillowContent() {
    return (
      <Query query={GET_CAMPAIGN_CONTENT_ITEM} fetchPolicy="cache-and-network">
        {({
          data: featuredData,
          loading: isFeaturedLoading,
          refetch: refetchCampaign,
        }) => {
          const featuredContent = flatten(
            get(featuredData, 'campaigns.edges', [])
              .map((edge) => edge.node)
              .filter((node) =>
                get(node, 'childContentItemsConnection.edges.length')
              )
              .map((node) => node.childContentItemsConnection.edges)
          );

          const featuredItem = get(featuredContent, '[0].node', null);
          return (
            <BackgroundView>
              <ThemedStatusBar />
              <FlexedSafeAreaView>
                <FlexedView>
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
                            refetchCampaign(),
                          ])
                        }
                        ListHeaderComponent={
                          <>
                            <PaddedView>
                              <CampusSelectButton
                                ButtonComponent={CampusTouchable}
                              />
                              <H2>My Willow</H2>
                            </PaddedView>
                            {featuredItem ? (
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
                                  isLoading={!featuredItem && isFeaturedLoading}
                                />
                              </TouchableScale>
                            ) : null}
                            <Features
                              navigation={this.props.navigation}
                              refetchRef={(refetch) => {
                                this.refetchFeatures = refetch;
                              }}
                            />
                          </>
                        }
                        onPressItem={this.handleOnPress}
                      />
                    )}
                  </Query>
                </FlexedView>
              </FlexedSafeAreaView>
            </BackgroundView>
          );
        }}
      </Query>
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
