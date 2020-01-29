import React from 'react';
import { Linking } from 'react-native';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { RockAuthedWebBrowser } from '@apollosproject/ui-connected';
import { get } from 'lodash';
import { Query } from 'react-apollo';
import GET_USER_PROFILE from './getUserProfile';

const Toolbar = () => (
  <Query query={GET_USER_PROFILE}>
    {({ data }) => (
      <RockAuthedWebBrowser>
        {(openUrl) => (
          <ActionBar>
            {get(data, 'currentUser.profile.campus.resources', [])
              .filter(
                ({ style }) =>
                  style === 'BAR_ITEM' || style === 'EXTERNAL_BAR_ITEM'
              ) // Resources with an icon show up in the action bar.
              .map(({ url, title, icon, style }) => (
                <ActionBarItem
                  onPress={() =>
                    style === 'EXTERNAL_BAR_ITEM'
                      ? Linking.openURL(url)
                      : openUrl(url)
                  }
                  icon={icon}
                  label={title}
                  key={title}
                />
              ))}
          </ActionBar>
        )}
      </RockAuthedWebBrowser>
    )}
  </Query>
);

Toolbar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Toolbar);
