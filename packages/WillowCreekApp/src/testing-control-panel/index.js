import React, { PureComponent } from 'react';
import { TableView } from '@apollosproject/ui-kit';
import { UserWebBrowserConsumer } from '../user-web-browser';
import { WebBrowserConsumer } from '../ui/WebBrowser';
import TouchableCell from './TouchableCell';

export default class TestingControlPanel extends PureComponent {
  static navigationOptions = () => ({
    title: 'Testing Control Panel',
  });

  render() {
    return (
      <TableView>
        <UserWebBrowserConsumer>
          {(openUserWebView) => (
            <TouchableCell
              handlePress={() =>
                openUserWebView({
                  url:
                    'https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending',
                })
              }
              iconName="share"
              cellText={`Open Web Browser With User Cookie`}
            />
          )}
        </UserWebBrowserConsumer>
        <WebBrowserConsumer>
          {(openUrl) => (
            <TouchableCell
              handlePress={() =>
                openUrl(
                  'https://apollosrock.newspring.cc',
                  {},
                  { useRockToken: true }
                )
              }
              iconName="share"
              cellText={`Open InAppBrowser With Rock Token`}
            />
          )}
        </WebBrowserConsumer>
        <TouchableCell
          handlePress={() => this.props.navigation.navigate('Onboarding')}
          iconName="Avatar"
          cellText={`Launch Onboarding`}
        />
      </TableView>
    );
  }
}
