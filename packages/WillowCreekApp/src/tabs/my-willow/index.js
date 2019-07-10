import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

import {
  TableView,
  Cell,
  Divider,
  H4,
  H5,
  H6,
  CellContent,
  PaddedView,
  BackgroundView,
  styled,
} from '@apollosproject/ui-kit';

import { SafeAreaView } from 'react-navigation';
import PageTitle from 'WillowCreekApp/src/ui/PageTitle';
import { LiveButton } from 'WillowCreekApp/src/live';

import UpcomingEventsFeed from './UpcomingEventsFeed';
import TVFeed from './TVFeed';
import FeaturedCampaign from './FeaturedCampaign';

// import TileContentFeed from '../TileContentFeed';
// import { LiveButton } from '../../live';

import Icon from './Icon';

const CellImage = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 4,
  height: theme.sizing.baseUnit * 4,
}))(Image);

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
        <SafeAreaView style={StyleSheet.absoluteFill}>
          <ScrollView>
            <PaddedView vertical={false}>
              <PageTitle padded>My Willow</PageTitle>
            </PaddedView>

            <TVFeed />

            <PaddedView style={{ paddingBottom: 0 }}>
              <H5>Coming up</H5>
            </PaddedView>
            <UpcomingEventsFeed />
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default MyWillow;
