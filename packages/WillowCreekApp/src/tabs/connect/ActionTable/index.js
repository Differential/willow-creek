import React from 'react';
import { View, Image } from 'react-native';

import {
  TableView,
  Cell,
  CellText,
  CellIcon,
  Divider,
  Touchable,
  styled,
  PaddedView,
  H5,
} from '@apollosproject/ui-kit';
import { WebBrowserConsumer } from 'WillowCreekApp/src/ui/WebBrowser';

const ActionTable = () => (
  <WebBrowserConsumer>
    {(openUrl) => (
      <View>
        <PaddedView style={{ paddingBottom: 0 }}>
          <H5 padded>Engage This Weekend</H5>
        </PaddedView>
        <TableView>
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/235')}
          >
            <Cell>
              <CellText>Find a serving opportunity</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/236')}
          >
            <Cell>
              <CellText>Join a small group</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/233')}
          >
            <Cell>
              <CellText>I need prayer</CellText>
              <CellIcon name="arrow-next" />
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/186')}
          >
            <Cell>
              <CellText>I would like to give</CellText>
              <CellIcon name="arrow-next" />
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
              <CellIcon name="arrow-next" />
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
