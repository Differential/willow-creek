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
      />
    )}
  </AnalyticsConsumer>
);

export default Location;
