import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';

import { LoginButton } from 'auth';
import BackgroundView from 'ui/BackgroundView';
import TableView, { Cell, CellIcon, CellText, Divider } from 'ui/TableView';
import { WebBrowserConsumer } from 'ui/WebBrowser';
import Touchable from 'ui/Touchable';

class Connect extends PureComponent {
  static navigationOptions = () => ({
    title: 'Connect',
    headerRight: <LoginButton />,
  });

  render() {
    return (
      <WebBrowserConsumer>
        {(openUrl) => (
          <BackgroundView>
            <ScrollView>
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
    );
  }
}

export default Connect;
