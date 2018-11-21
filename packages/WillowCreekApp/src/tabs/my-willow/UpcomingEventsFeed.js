import React from 'react';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import { HorizontalTileFeed, TouchableScale } from '@apollosproject/ui-kit';

import { WebBrowserConsumer } from 'WillowCreekApp/src/ui/WebBrowser';
import ContentCardConnected from 'WillowCreekApp/src/ui/ContentCardConnected';
import getUpcomingEvents from './getUpcomingEvents';

const getUrl = ({ sharing }) => sharing.url;

const UpcomingEventsFeed = () => (
  <WebBrowserConsumer>
    {(openUrl) => (
      <Query query={getUpcomingEvents} fetchPolicy="cache-and-network">
        {({ loading, data }) => (
          <HorizontalTileFeed
            content={get(data, 'upcomingEvents', [])}
            renderItem={({ item }) => (
              <TouchableScale onPress={() => openUrl(getUrl(item))}>
                <ContentCardConnected
                  contentId={item.id}
                  isLoading={loading}
                  inHorizontalList
                  tile
                />
              </TouchableScale>
            )}
            loadingStateObject={{
              id: 'fake_id',
              title: '',
              coverImage: [],
            }}
            isLoading={loading}
          />
        )}
      </Query>
    )}
  </WebBrowserConsumer>
);

export default UpcomingEventsFeed;
