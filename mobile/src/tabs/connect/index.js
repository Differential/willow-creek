import React from 'react';
import { ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import TableView, { Cell, CellIcon, CellText, Divider } from 'ui/TableView';
import LiveNowButton from '../../live';

export class ConnectScreen extends React.Component {
  static navigationOptions = {
    title: 'Connect',
  };
  render() {
    return (
      <ScrollView>
        <LiveNowButton navigation={this.props.navigation} />
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
    );
  }
}

ConnectScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export const ConnectStack = createStackNavigator(
  {
    Connect: ConnectScreen,
  },
  {
    initialRouteName: 'Connect',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default ConnectStack;
