import React from 'react';
import { View, Linking } from 'react-native';
// import NavigationActions from 'WillowCreekApp/src/NavigationService';
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
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';
import { GET_USER_PROFILE } from '../UserAvatarHeader';

const ActionTable = () => (
  <Query query={GET_USER_PROFILE}>
    {({ data }) => (
      <RockAuthedWebBrowser>
        {(openUrl) => (
          <View>
            <PaddedView style={{ paddingBottom: 0 }}>
              <H5 padded>Connect</H5>
            </PaddedView>
            <TableView>
              {get(data, 'currentUser.profile.campus.resources', [])
                .filter(({ style }) => style === 'LIST_ITEM') // Resources with an icon show up in the action bar.
                .map(({ url, title }) => (
                  <>
                    <Touchable
                      onPress={() =>
                        url.includes('http')
                          ? openUrl(url)
                          : Linking.openURL(url)
                      }
                    >
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
      </RockAuthedWebBrowser>
    )}
  </Query>
);

const StyledActionTable = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 100,
}))(ActionTable);

export default StyledActionTable;
