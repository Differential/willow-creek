import React from 'react';
import { View, Image } from 'react-native';

import {
  TableView,
  Cell,
  CellContent,
  Divider,
  Touchable,
  styled,
  PaddedView,
  H4,
  H5,
  H6,
} from '@apollosproject/ui-kit';
import { WebBrowserConsumer } from 'WillowCreekApp/src/ui/WebBrowser';

const CellImage = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 4,
  height: theme.sizing.baseUnit * 4,
}))(Image);

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
              <CellImage source={require('./empty.png')} />
              <CellContent>
                <H4>Volunteer or Serve</H4>
                <H6>Lorem ipsum doler sit itmut</H6>
              </CellContent>
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/236')}
          >
            <Cell>
              <CellImage source={require('./empty.png')} />
              <CellContent>
                <H4>Join a small group</H4>
                <H6>Lorem ipsum doler sit itmut</H6>
              </CellContent>
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/233')}
          >
            <Cell>
              <CellImage source={require('./empty.png')} />
              <CellContent>
                <H4>Get baptized</H4>
                <H6>Lorem ipsum doler sit itmut</H6>
              </CellContent>
            </Cell>
          </Touchable>
          <Divider />
          <Touchable
            onPress={() => openUrl('https://apollosrock.newspring.cc/page/186')}
          >
            <Cell>
              <CellImage source={require('./empty.png')} />
              <CellContent>
                <H4>I have a question</H4>
                <H6>Lorem ipsum doler sit itmut</H6>
              </CellContent>
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
