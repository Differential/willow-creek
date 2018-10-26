import React from 'react';
import { View } from 'react-native';

import TableView, {
  Cell,
  CellIcon,
  CellText,
  Divider,
} from 'apolloschurchapp/src/ui/TableView';
import { WebBrowserConsumer } from 'apolloschurchapp/src/ui/WebBrowser';
import Touchable from 'apolloschurchapp/src/ui/Touchable';
import NavigationActions from 'apolloschurchapp/src/NavigationService';
import styled from 'apolloschurchapp/src/ui/styled';
import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import { H4 } from 'apolloschurchapp/src/ui/typography';

const RowHeader = styled(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: theme.sizing.baseUnit,
}))(PaddedView);

const Name = styled({
  flexGrow: 1,
})(View);

const ActionTable = () => (
  <WebBrowserConsumer>
    {(openUrl) => (
      <View>
        <RowHeader>
          <Name>
            <H4>{'Connect with Apollos'}</H4>
          </Name>
        </RowHeader>
        <TableView>
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/235')}
          >
            <Cell>
              <CellIcon name="check" />
              <CellText>Find a serving opportunity</CellText>
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/236')}
          >
            <Cell>
              <CellIcon name="groups" />
              <CellText>Join a small group</CellText>
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/233')}
          >
            <Cell>
              <CellIcon name="share" />
              <CellText>I need prayer</CellText>
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/186')}
          >
            <Cell>
              <CellIcon name="download" />
              <CellText>I would like to give</CellText>
            </Cell>
          </Touchable>
        </TableView>
        <TableView>
          <Touchable
            onPress={() => NavigationActions.navigate('TestingControlPanel')}
          >
            <Cell>
              <CellIcon name="settings" />
              <CellText>Open Testing Panel</CellText>
            </Cell>
          </Touchable>
        </TableView>
      </View>
    )}
  </WebBrowserConsumer>
);

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
