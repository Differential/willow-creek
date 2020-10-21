import React from 'react';

import { MapViewConnected } from '@apollosproject/ui-mapview';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';

import { GET_FEED_FEATURES } from '@apollosproject/ui-connected';

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
          refetchQueries: [{ query: GET_FEED_FEATURES, variables: undefined }],
        }}
      />
    )}
  </AnalyticsConsumer>
);

export default Location;
