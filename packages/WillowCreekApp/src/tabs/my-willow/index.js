import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { ScrollView, StyleSheet, SafeAreaView, Image } from 'react-native';
import PropTypes from 'prop-types';
import { get } from 'lodash';

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
  HorizontalTileFeed,
} from '@apollosproject/ui-kit';

import PageTitle from 'WillowCreekApp/src/ui/PageTitle';
import ContentCardConnected from 'WillowCreekApp/src/ui/ContentCardConnected';

import TileContentFeed from '../TileContentFeed';
// import { LiveButton } from '../../live';
import Icon from './Icon';

import getUserFeed from './getUserFeed';

console.log({ Cell, CellContent });

const CellImage = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 4,
  height: theme.sizing.baseUnit * 4,
}))(Image);

class MyWillow extends PureComponent {
  static navigationOptions = {
    tabBarIcon: Icon,
    tabBarLabel: 'MY WILLOW',
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
            <Query query={getUserFeed} fetchPolicy="cache-and-network">
              {({ loading, data, error }) =>
                console.log({ loading, data, error }) || (
                  <HorizontalTileFeed
                    content={get(data, 'userFeed.edges', []).map(
                      (edge) => edge.node
                    )}
                    renderItem={({ item }) => (
                      <ContentCardConnected
                        contentId={item.id}
                        isLoading={loading}
                        tile
                      />
                    )}
                    loadingStateObject={{
                      id: 'fake_id',
                      title: '',
                      coverImage: [],
                    }}
                    isLoading={loading}
                  />
                )
              }
            </Query>

            <PaddedView style={{ paddingBottom: 0 }}>
              <H5 padded>Engage This Weekend</H5>
            </PaddedView>
            <TableView>
              <Cell>
                <CellImage source={require('./bible-app.png')} />
                <CellContent>
                  <H4>Message Notes</H4>
                  <H6>Follow along with the message!</H6>
                </CellContent>
              </Cell>
              <Divider />
              <Cell>
                <CellImage source={require('./locations.png')} />
                <CellContent>
                  <H4>Join us live</H4>
                  <H6>See the schedule and set a reminder</H6>
                </CellContent>
              </Cell>
            </TableView>

            <PaddedView style={{ paddingBottom: 0 }}>
              <H5>Coming up</H5>
            </PaddedView>
            {/* <Query query={getUserFeed} fetchPolicy="cache-and-network">
              {({ loading, data }) => (
                <TileContentFeed
                  content={get(data, 'userFeed.edges', []).map(
                    (edge) => edge.node
                  )}
                  isLoading={loading}
                />
              )}
                  </Query> */}
          </ScrollView>
        </SafeAreaView>
      </BackgroundView>
    );
  }
}

export default MyWillow;
