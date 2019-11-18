import React from 'react';
import { View } from 'react-native';
import NavigationActions from 'WillowCreekApp/src/NavigationService';
import { get } from 'lodash';
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
import { Query } from 'react-apollo';
import { WebBrowserConsumer } from 'WillowCreekApp/src/ui/WebBrowser';
import GET_USER_PROFILE from '../getUserProfile';

const ActionTable = () => (
  <Query query={GET_USER_PROFILE}>
    {({ data }) => (
      <WebBrowserConsumer>
        {(openUrl) => (
          <View>
            <PaddedView style={{ paddingBottom: 0 }}>
              <H5 padded>Connect</H5>
            </PaddedView>
            <TableView>
              {get(data, 'currentUser.profile.campus.resources', [])
                .filter(({ icon }) => !icon) // Resources with an icon show up in the action bar.
                .map(({ url, title }) => (
                  <>
                    <Touchable onPress={() => openUrl(url)}>
                      <Cell>
                        <CellText>{title}</CellText>
                        <CellIcon name="arrow-next" />
                      </Cell>
                    </Touchable>
                    <Divider />
                  </>
                ))}
            </TableView>
            {/* <TableView> */}
            {/*   <Touchable */}
            {/*     onPress={() => */}
            {/*       NavigationActions.navigate('TestingControlPanel') */}
            {/*     } */}
            {/*   > */}
            {/*     <Cell> */}
            {/*       <CellIcon name="settings" /> */}
            {/*       <CellText>Open Testing Panel</CellText> */}
            {/*       <CellIcon name="arrow-next" /> */}
            {/*     </Cell> */}
            {/*   </Touchable> */}
            {/* </TableView> */}
          </View>
        )}
      </WebBrowserConsumer>
    )}
  </Query>
);

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
