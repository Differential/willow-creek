import React from 'react';
import { ActionBar, ActionBarItem } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import { WebBrowserConsumer } from 'WillowCreekApp/src/ui/WebBrowser';

const Toolbar = ({ navigation }) => (
  <WebBrowserConsumer>
    {openUrl => (
      <ActionBar>
        <ActionBarItem
          onPress={() =>
            openUrl(
              'https://www.willowcreek.org/en/connect/ministries/small-groups-and-section-communities'
            )
          }
          icon="groups"
          label="Groups"
        />
        {/*<ActionBarItem
          onPress={() => navigation.navigate('Passes')}
          icon="badge"
          label="Check-in"
        />*/}
        <ActionBarItem
          onPress={() => openUrl('https://www.willowcreek.org/en/give')}
          icon="like-solid"
          label="Give"
        />
      </ActionBar>
    )}
  </WebBrowserConsumer>
);

Toolbar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Toolbar);
