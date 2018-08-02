import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { Query } from 'react-apollo';

import { LoginButton } from '/mobile/auth';
import BackgroundView from '/mobile/ui/BackgroundView';
import TableView, {
  Cell,
  CellIcon,
  CellText,
  Divider,
} from '/mobile/ui/TableView';
import { WebBrowserConsumer } from '/mobile/ui/WebBrowser';
import Touchable from '/mobile/ui/Touchable';
import UserAvatarView from '/mobile/ui/UserAvatarView';

import getLoginState from './getLoginState.graphql';
import getUserProfile from './getUserProfile.graphql';

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
                  {({ data: { isLoggedIn = null } }) => {
                    if (isLoggedIn)
                      return (
                        <Query query={getUserProfile}>
                          {({
                            data: {
                              currentUser: {
                                profile: { photo, firstName, lastName } = {},
                              } = {},
                            } = {},
                          }) => (
                            <UserAvatarView
                              firstName={firstName}
                              lastName={lastName}
                              photo={photo}
                            />
                          )}
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
