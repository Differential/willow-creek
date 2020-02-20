import React from 'react';

import { MapViewConnected } from '@apollosproject/ui-mapview';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';

import GET_USER_FEED from '../../tabs/home/getUserFeed';
import GET_FEED_FEATURES from '../../tabs/home/Features/getFeedFeatures';
import GET_CAMPAIGN_CONTENT_ITEM from '../../tabs/home/getCampaignContentItem';
import GET_CONTENT_CHANNELS from '../../tabs/discover/DiscoverFeed/getContentChannels';

const Location = (props) => (
  <AnalyticsConsumer>
    {({ track, identify }) => (
      <MapViewConnected
        {...props}
        onChangeCampus={({ campus }) => {
          track({
            eventName: 'Change Campus',
            properties: {
              campus: campus.name,
            },
          });
          identify();
        }}
        changeCampusOptions={{
          awaitRefetchQueries: true,
          refetchQueries: [
            {
              query: GET_USER_FEED,
              variables: {
                first: 10,
                after: null,
              },
            },
            { query: GET_CAMPAIGN_CONTENT_ITEM, variables: undefined },
            { query: GET_FEED_FEATURES, variables: undefined },
            { query: GET_CONTENT_CHANNELS, variables: undefined },
          ],
        }}
      />
    )}
  </AnalyticsConsumer>
);

export default Location;
