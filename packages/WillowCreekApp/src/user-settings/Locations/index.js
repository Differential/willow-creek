import React from 'react';

import { MapViewConnected } from '@apollosproject/ui-mapview';
import { AnalyticsConsumer } from '@apollosproject/ui-analytics';

import { GET_HOME_FEED } from '../../tabs/home';

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
          refetchQueries: [{ query: GET_HOME_FEED, variables: undefined }],
        }}
      />
    )}
  </AnalyticsConsumer>
);

export default Location;
