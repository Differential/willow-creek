import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';

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
import UserAvatarView from 'apolloschurchapp/src/ui/UserAvatarView';
import NavigationActions from 'apolloschurchapp/src/NavigationService';

import getLoginState from './getLoginState';
import getUserProfile from './getUserProfile';

class Connect extends PureComponent {
  static navigationOptions = () => ({
    title: 'Connect',
    headerRight: <LoginButton />,
  });

  render() {
    return (
      <BackgroundView>
        <WebBrowserConsumer>
          {(openUrl) => (
            <BackgroundView>
              <ScrollView>
                <Query query={getLoginState}>
                  {({ data }) => {
                    if (get(data, 'isLoggedIn', false))
                      return (
                        <Query
                          query={getUserProfile}
                          fetchPolicy="cache-and-network"
                        >
                          {({
                            data: { currentUser } = { currentUser: {} },
                            refetch,
                          }) => {
                            const profile = get(currentUser, 'profile', {});
                            const { photo, firstName, lastName } = profile;
                            return (
                              <UserAvatarView
                                firstName={firstName}
                                lastName={lastName}
                                photo={photo}
                                refetch={refetch}
                              />
                            );
                          }}
                        </Query>
                      );
                    return null;
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
              </ScrollView>
            </BackgroundView>
          )}
        </WebBrowserConsumer>
      </BackgroundView>
    );
  }
}

export default Connect;
