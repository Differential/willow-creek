import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import { View, SafeAreaView, StatusBar } from 'react-native';

import {
  RockAuthedWebBrowser,
  FeaturesFeedConnected,
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

  handleOnPress = ({ openUrl }) => ({ action, relatedNode }) => {
    const { navigation } = this.props;
    if (action === 'READ_CONTENT') {
      navigation.navigate('ContentSingle', {
        itemId: relatedNode.id,
        transitionKey: 2,
      });
    }
    if (action === 'READ_EVENT') {
      navigation.navigate('Event', {
        eventId: relatedNode.id,
        transitionKey: 2,
      });
    }
    if (action === 'OPEN_URL') {
      openUrl(relatedNode.url);
    }
  };

  renderMyWillowContent() {
    return (
      <RockAuthedWebBrowser>
        {(openUrl) => (
          <BackgroundView>
            <ThemedStatusBar />
            <FlexedSafeAreaView>
              <FeaturesFeedConnected
                onPressActionItem={this.handleOnPress({ openUrl })}
                ListHeaderComponent={
                  <PaddedView>
                    <CampusSelectButton ButtonComponent={CampusTouchable} />
                    <H2>My Willow</H2>
                  </PaddedView>
                }
              />
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
