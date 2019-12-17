import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import EventCard from './EventCard';

storiesOf('event-feed/EventCard', module)
  .add('default', () => (
    <EventCard
      image={{
        sources: [
          {
            uri: 'https://picsum.photos/800/1600/?random',
          },
        ],
      }}
      start="2020-02-18T01:00:00Z"
      end="2020-02-18T02:30:00Z"
      name="FAKE_EVENT"
      location="FAKE_LOCATION"
      __typename="Event"
    />
  ))
  .add('loading', () => (
    <EventCard
      image={[
        {
          uri: 'https://picsum.photos/800/1600/?random',
        },
      ]}
      start="2020-02-18T01:00:00Z"
      end="2020-02-18T02:30:00Z"
      name="FAKE_EVENT"
      location="FAKE_LOCATION"
      __typename="Event"
      isLoading
    />
  ))
  .add('no image', () => (
    <EventCard
      image={null}
      start="2020-02-18T01:00:00Z"
      end="2020-02-18T02:30:00Z"
      name="FAKE_EVENT"
      location="FAKE_LOCATION"
      __typename="Event"
    />
  ))
  .add('no image loading', () => (
    <EventCard
      image={null}
      start="2020-02-18T01:00:00Z"
      end="2020-02-18T02:30:00Z"
      name="FAKE_EVENT"
      location="FAKE_LOCATION"
      __typename="Event"
      isLoading
    />
  ));
