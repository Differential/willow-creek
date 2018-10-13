import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';

import BackgroundView from 'apolloschurchapp/src/ui/BackgroundView';
import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import TableView, {
  Cell,
  CellIcon,
  CellText,
  Divider,
} from 'apolloschurchapp/src/ui/TableView';
import { WebBrowserConsumer } from 'apolloschurchapp/src/ui/WebBrowser';
import Touchable from 'apolloschurchapp/src/ui/Touchable';
import AvatarForm from 'apolloschurchapp/src/ui/UserAvatarView/AvatarForm';
import styled from 'apolloschurchapp/src/ui/styled';
import ActivityIndicator from 'apolloschurchapp/src/ui/ActivityIndicator';
import logout from '../auth/logout';
import getLoginState from '../auth/getLoginState';

const AvatarView = styled({
  alignItems: 'center',
  justifyContent: 'center',
})(PaddedView);

class UserSettings extends PureComponent {
  static navigationOptions = () => ({
    title: 'Settings',
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }),
  };

  render() {
    return (
      <Query query={getLoginState}>
        {({ data: { isLoggedIn = false, loading } }) => {
          if (loading) return <ActivityIndicator />;
          if (!isLoggedIn) return null;
          return (
            <BackgroundView>
              <AvatarView>
                <AvatarForm
                  text
                  photo={this.props.navigation.getParam('photo', '')}
                  refetch={this.props.navigation.getParam('refetch', {})}
                />
              </AvatarView>
              <WebBrowserConsumer>
                {(openUrl) => (
                  <BackgroundView>
                    <TableView>
                      <Touchable
                        onPress={async () => {
                          await this.props.navigation.navigate(
                            'PersonalDetails'
                          );
                        }}
                      >
                        <Cell>
                          <CellText>Personal Details</CellText>
                          <CellIcon name="arrow-next" />
                        </Cell>
                      </Touchable>
                      <Divider />
                      <Touchable
                        onPress={async () => {
                          await this.props.navigation.navigate(
                            'ChangePassword'
                          );
                        }}
                      >
                        <Cell>
                          <CellText>Change Password</CellText>
                          <CellIcon name="arrow-next" />
                        </Cell>
                      </Touchable>
                    </TableView>
                    <TableView>
                      <Touchable
                        onPress={() =>
                          openUrl('https://apollosrock.newspring.cc/')
                        }
                      >
                        <Cell>
                          <CellText>Give Feedback</CellText>
                          <CellIcon name="arrow-next" />
                        </Cell>
                      </Touchable>
                    </TableView>
                    <TableView>
                      <Touchable
                        onPress={() =>
                          openUrl('https://apollosrock.newspring.cc/')
                        }
                      >
                        <Cell>
                          <CellText>Privacy Policy</CellText>
                          <CellIcon name="arrow-next" />
                        </Cell>
                      </Touchable>
                      <Divider />
                      <Touchable
                        onPress={() =>
                          openUrl('https://apollosrock.newspring.cc/')
                        }
                      >
                        <Cell>
                          <CellText>Terms of Use</CellText>
                          <CellIcon name="arrow-next" />
                        </Cell>
                      </Touchable>
                    </TableView>
                    <TableView>
                      <Mutation mutation={logout}>
                        {(handleLogout) => (
                          <Touchable
                            onPress={async () => {
                              await handleLogout();
                              await this.props.navigation.navigate('Connect');
                            }}
                          >
                            <Cell>
                              <CellText>Logout</CellText>
                              <CellIcon name="arrow-next" />
                            </Cell>
                          </Touchable>
                        )}
                      </Mutation>
                    </TableView>
                  </BackgroundView>
                )}
              </WebBrowserConsumer>
            </BackgroundView>
          );
        }}
      </Query>
    );
  }
}

export default UserSettings;
