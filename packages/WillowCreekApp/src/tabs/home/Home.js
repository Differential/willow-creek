import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import { View, StatusBar } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import gql from 'graphql-tag';

import {
  RockAuthedWebBrowser,
  FeaturesFeedConnected,
  FEATURE_FEED_ACTION_MAP,
} from '@apollosproject/ui-connected';

import {
  BackgroundView,
  Touchable,
  PaddedView,
  styled,
  H2,
} from '@apollosproject/ui-kit';
import FindCampusAd from '../../ui/FindCampusAd';

import CampusSelectButton from '../../ui/CampusSelectButton';
import Icon from './Icon';

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

function handleOnPress({ action, ...props }) {
  if (FEATURE_FEED_ACTION_MAP[action]) {
    FEATURE_FEED_ACTION_MAP[action]({ action, ...props });
  }
  // If you add additional actions, you can handle them here.
  // Or add them to the FEATURE_FEED_ACTION_MAP, with the syntax
  // { [ActionName]: function({ relatedNode, action, ...FeatureFeedConnectedProps}) }
}

// getHomeFeed uses the HOME_FEATURES in the config.yml
// You can also hardcode an ID if you are confident it will never change
// Or use some other strategy to get a FeatureFeed.id
const GET_HOME_FEED = gql`
  query getHomeFeatureFeed {
    homeFeedFeatures {
      id
    }
  }
`;

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

  renderMyWillowContent() {
    return (
      <RockAuthedWebBrowser>
        {(openUrl) => (
          <BackgroundView>
            <ThemedStatusBar barStyle="dark-content" />
            <FlexedSafeAreaView>
              <Query query={GET_HOME_FEED}>
                {({ data }) => (
                  <FeaturesFeedConnected
                    openUrl={openUrl}
                    navigation={this.props.navigation}
                    featureFeedId={data?.homeFeedFeatures?.id}
                    onPressActionItem={handleOnPress}
                    ListHeaderComponent={
                      <PaddedView>
                        <CampusSelectButton ButtonComponent={CampusTouchable} />
                        <H2>My Willow</H2>
                      </PaddedView>
                    }
                  />
                )}
              </Query>
            </FlexedSafeAreaView>
          </BackgroundView>
        )}
      </RockAuthedWebBrowser>
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
