import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';

import LoginForm from 'login';
import BackgroundView from 'ui/BackgroundView';
import TableView, { Cell, CellIcon, CellText, Divider } from 'ui/TableView';

class Connect extends PureComponent {
  static navigationOptions = {
    title: 'Connect',
  };
  render() {
    return (
      <BackgroundView>
        <ScrollView>
          <TableView>
            <Cell>
              <CellIcon name="check" />
              <CellText>Find a serving opportunity</CellText>
            </Cell>
            <Divider />
            <Cell>
              <CellIcon name="groups" />
              <CellText>Join a small group</CellText>
            </Cell>
            <Divider />
            <Cell>
              <CellIcon name="share" />
              <CellText>I need prayer</CellText>
            </Cell>
            <Divider />
            <Cell>
              <CellIcon name="download" />
              <CellText>I would like to give</CellText>
            </Cell>
            <Divider />
            <Cell>
              <CellIcon name="building" />
              <CellText>Find Service Times & Locations</CellText>
            </Cell>
            <LoginForm />
          </TableView>
        </ScrollView>
      </BackgroundView>
    );
  }
}

export default Connect;
