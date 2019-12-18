import React from 'react';
import renderer from 'react-test-renderer';

import Providers from 'WillowCreekApp/src/Providers';

import EventCard from './EventCard';

describe('The EventCard component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render isLoading state', () => {
    const tree = renderer.create(
      <Providers>
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
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with out an image', () => {
    const tree = renderer.create(
      <Providers>
        <EventCard
          image={null}
          start="2020-02-18T01:00:00Z"
          end="2020-02-18T02:30:00Z"
          name="FAKE_EVENT"
          location="FAKE_LOCATION"
          __typename="Event"
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
