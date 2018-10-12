import React, { PureComponent } from 'react';
import TableView, { Divider } from 'apolloschurchapp/src/ui/TableView';
import ChangeLivestream from './ChangeLivestream';

export default class TestingControlPanel extends PureComponent {
  static navigationOptions = () => ({
    title: 'Testing Control Panel',
  });

  render() {
    return (
      <TableView>
        <ChangeLivestream />
        <Divider />
      </TableView>
    );
  }
}
