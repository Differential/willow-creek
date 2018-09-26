import React from 'react';
import renderer from 'react-test-renderer';

import TrackEventWhenLoaded from './TrackEventWhenLoaded';

const trackMock = jest.fn();

describe('The TrackEventWhenLoaded component', () => {
  afterEach(() => {
    trackMock.mockClear();
  });
  it('should track an event if mounted with loaded=true', () => {
    renderer.create(
      <TrackEventWhenLoaded
        loaded
        eventName="Track Something"
        properties={{ ThingId: '1234' }}
        track={trackMock}
      />
    );
    expect(trackMock.mock.calls).toMatchSnapshot();
  });

  it('should track an event if mounted with loaded=false and then switching to true', () => {
    const tree = renderer.create(
      <TrackEventWhenLoaded
        loaded={false}
        eventName="Track Something"
        properties={{ ThingId: '1234' }}
        track={trackMock}
        key="tracker"
      />
    );
    expect(trackMock.mock.calls).toMatchSnapshot();
    tree.update(
      <TrackEventWhenLoaded
        loaded
        eventName="Track Something"
        properties={{ ThingId: '1234' }}
        track={trackMock}
        key="tracker"
      />
    );
    expect(trackMock.mock.calls).toMatchSnapshot();
  });
});
