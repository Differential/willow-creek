import React, { PureComponent } from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { BackgroundView } from '@apollosproject/ui-kit';
import ActionTable from './ActionTable';
import { UserAvatarHeaderConnected } from './UserAvatarHeader';
import { RecentlyLikedTileFeedConnected } from './RecentlyLikedTileFeed';

class Connect extends PureComponent {
  static navigationOptions = () => ({
    title: 'Connect',
    header: null,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  render() {
    return (
      <BackgroundView>
        <SafeAreaView style={StyleSheet.absoluteFill}>
          <ScrollView>
            <UserAvatarHeaderConnected />
            <RecentlyLikedTileFeedConnected />
            <ActionTable />
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default Connect;
