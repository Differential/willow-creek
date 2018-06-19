import React from 'react';
import { ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import BackgroundView from 'ui/BackgroundView';
import TableView, { Cell, CellIcon, CellText, Divider } from 'ui/TableView';
import tabBarIcon from '../tabBarIcon';

export class ConnectScreen extends React.Component {
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
          </TableView>
        </ScrollView>
      </BackgroundView>
    );
  }
}

const ConnectStack = createStackNavigator(
  {
    Connect: ConnectScreen,
  },
  {
    initialRouteName: 'Connect',
  }
);

ConnectStack.navigationOptions = {
  tabBarIcon: tabBarIcon('profile'),
};

export default ConnectStack;
