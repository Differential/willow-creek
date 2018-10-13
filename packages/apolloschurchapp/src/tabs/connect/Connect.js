import React, { PureComponent } from 'react';
import { ScrollView, SafeAreaView, Platform } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { LoginButton } from 'apolloschurchapp/src/auth';
import BackgroundView from 'apolloschurchapp/src/ui/BackgroundView';
import TableView, {
  Cell,
  CellIcon,
  CellText,
  Divider,
} from 'apolloschurchapp/src/ui/TableView';
import { WebBrowserConsumer } from 'apolloschurchapp/src/ui/WebBrowser';
import Touchable from 'apolloschurchapp/src/ui/Touchable';
import { withTheme } from 'apolloschurchapp/src/ui/theme';
import { H1, BodyText, Paragraph } from 'apolloschurchapp/src/ui/typography';
import styled from 'apolloschurchapp/src/ui/styled';
import Icon from 'apolloschurchapp/src/ui/Icon';
import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import NavigationActions from 'apolloschurchapp/src/NavigationService';

import { UserAvatarHeaderConnected } from './UserAvatarHeader';
import { RecentlyLikedTileFeedConnected } from './RecentlyLikedTileFeed';
import getLoginState from './getLoginState';

const Title = styled(({ theme }) => ({
  color: theme.colors.primary,
  paddingBottom: theme.helpers.verticalRhythm(1.5),
}))(H1);

const BrandIcon = withTheme(({ theme }) => ({
  name: 'brand-icon',
  size: theme.sizing.baseUnit * 2.25,
  marginBottom: theme.sizing.baseUnit,
  fill: theme.colors.primary,
}))(Icon);

const Header = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 1.5,
  backgroundColor: theme.colors.background.paper,
  // These conditional paddings are due to inconsistencies with SafeAreaView.
  // TODO: revisit and update/remove these values after next RN upgrade.
  ...Platform.select({
    ios: {
      paddingTop: theme.sizing.baseUnit * 5,
    },
    android: {
      paddingTop: theme.sizing.baseUnit * 4,
    },
  }),
}))(PaddedView);

const StyledLoginButton = styled(({ theme }) => ({
  marginVertical: theme.sizing.baseUnit,
}))(LoginButton);

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
        <WebBrowserConsumer>
          {(openUrl) => (
            <ScrollView>
              <SafeAreaView>
                <Query query={getLoginState}>
                  {({ data }) => {
                    if (get(data, 'isLoggedIn', false))
                      return [
                        <UserAvatarHeaderConnected key="UserAvatarHeaderConnected" />,
                        <RecentlyLikedTileFeedConnected key="RecentlyLikedTileFeedConnected" />,
                      ];
                    return (
                      <Header>
                        <BrandIcon />
                        <Title>Connect!</Title>
                        <Paragraph>
                          <BodyText>
                            Our mission is to help you connect to others as well
                            as help you in your walk with Christ.
                          </BodyText>
                        </Paragraph>
                        <Paragraph>
                          <BodyText>
                            By joining this community, you will unlock amazing
                            features like; curated content and devotionals,
                            simple event registration, and easy online giving!
                          </BodyText>
                        </Paragraph>
                        <StyledLoginButton />
                      </Header>
                    );
                  }}
                </Query>
                <TableView>
                  <Touchable
                    onPress={() =>
                      openUrl('https://apollosrock.newspring.cc/page/235')
                    }
                  >
                    <Cell>
                      <CellIcon name="check" />
                      <CellText>Find a serving opportunity</CellText>
                    </Cell>
                  </Touchable>
                  <Divider />
                  <Touchable
                    onPress={() =>
                      openUrl('https://apollosrock.newspring.cc/page/236')
                    }
                  >
                    <Cell>
                      <CellIcon name="groups" />
                      <CellText>Join a small group</CellText>
                    </Cell>
                  </Touchable>
                  <Divider />
                  <Touchable
                    onPress={() =>
                      openUrl('https://apollosrock.newspring.cc/page/233')
                    }
                  >
                    <Cell>
                      <CellIcon name="share" />
                      <CellText>I need prayer</CellText>
                    </Cell>
                  </Touchable>
                  <Divider />
                  <Touchable
                    onPress={() =>
                      openUrl('https://apollosrock.newspring.cc/page/186')
                    }
                  >
                    <Cell>
                      <CellIcon name="download" />
                      <CellText>I would like to give</CellText>
                    </Cell>
                  </Touchable>
                  <Touchable
                    onPress={() =>
                      NavigationActions.navigate('TestingControlPanel')
                    }
                  >
                    <Cell>
                      <CellIcon name="download" />
                      <CellText>I would like to test the app</CellText>
                    </Cell>
                  </Touchable>
                </TableView>
              </SafeAreaView>
            </ScrollView>
          )}
        </WebBrowserConsumer>
      </BackgroundView>
    );
  }
}

export default Connect;
