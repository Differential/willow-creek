import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { WebBrowserConsumer } from 'WillowCreekApp/src/ui/WebBrowser';
import { get } from 'lodash';
import { Query } from 'react-apollo';
import GET_USER_PROFILE from './getUserProfile';

const Toolbar = () => (
  <Query query={GET_USER_PROFILE}>
    {({ data }) => (
      <WebBrowserConsumer>
        {(openUrl) => (
          <ActionBar>
            {get(data, 'currentUser.profile.campus.resources', [])
              .filter(({ icon }) => !!icon) // Resources with an icon show up in the action bar.
              .map(({ url, title, icon }) => (
                <ActionBarItem
                  onPress={() => openUrl(url)}
                  icon={icon}
                  label={title}
                  key={title}
                />
              ))}
          </ActionBar>
        )}
      </WebBrowserConsumer>
    )}
  </Query>
);

Toolbar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Toolbar);
