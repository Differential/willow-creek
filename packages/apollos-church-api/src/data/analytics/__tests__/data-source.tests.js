import { mockUA, mockSend, mockEvent } from 'universal-analytics';
import Analytics, { mockTrack, mockIdentify } from 'analytics-node';
import { AuthenticationError } from 'apollo-server';
import DataSource from '../data-source';

const mockCurrentPerson = jest.fn().mockImplementation(() => ({
  id: 5,
  email: 'test@test.com',
  firstName: 'Rick',
  lastName: 'Hampton',
}));

const mockNoPerson = () => {
  throw new AuthenticationError();
};
const mockOtherError = () => {
  throw new Error('Some other error');
};

const clearMocks = () => {
  [mockUA, mockSend, mockEvent, Analytics, mockTrack, mockIdentify].forEach(
    (mock) => {
      mock.mockClear();
    }
  );
};

const AuthWithUser = {
  getCurrentPerson: mockCurrentPerson,
};

const AuthWithoutUser = {
  getCurrentPerson: mockNoPerson,
};

const buildDataSource = (Auth = AuthWithUser) => {
  const dataSource = new DataSource();
  dataSource.initialize({ context: { dataSources: { Auth } } });
  return dataSource;
};

describe('Analytics Data Source', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    clearMocks();
    process.env = { ...OLD_ENV };

    process.env.APOLLOS_SEGMENT_KEY = 'something';
    process.env.APOLLOS_GA_KEY = 'something-else';
  });
  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('must accept arbitrary interfaces', async () => {
    const track = jest.fn();
    const identify = jest.fn();
    const fakeClient = {
      track,
      identify,
      shouldTrack: true,
      shouldIdentify: true,
    };
    const dataSource = new DataSource([fakeClient]);
    dataSource.initialize({ context: { dataSources: { Auth: AuthWithUser } } });

    const resultTrack = await dataSource.track({
      anonymousId: 'deviceId5',
      eventName: 'View Content',
    });

    const resultIdentify = await dataSource.identify({
      anonymousId: 'deviceId5',
    });

    expect(resultTrack).toMatchSnapshot();
    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toMatchSnapshot();

    expect(resultIdentify).toMatchSnapshot();
    expect(identify).toHaveBeenCalledTimes(1);
    expect(identify).toMatchSnapshot();
  });

  describe('track', () => {
    it('must track an event with a name and no properties', async () => {
      const analytics = buildDataSource();
      const result = await analytics.track({
        eventName: 'View Content',
        anonymousId: 'deviceId5',
      });
      expect(result).toMatchSnapshot();
      expect(mockTrack).toHaveBeenCalledTimes(1);
      expect(mockTrack.mock.calls).toMatchSnapshot();

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockUA).toHaveBeenCalledTimes(1);
      expect(mockUA.mock.calls).toMatchSnapshot();
    });

    it('must not track segment without a key', async () => {
      delete process.env.APOLLOS_SEGMENT_KEY;
      const analytics = buildDataSource();
      const result = await analytics.track({
        eventName: 'View Content',
      });
      expect(result).toMatchSnapshot();
      expect(mockTrack).toHaveBeenCalledTimes(0);

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockUA).toHaveBeenCalledTimes(1);
      expect(mockUA.mock.calls).toMatchSnapshot();
    });

    it('must not track google analytics without a key', async () => {
      delete process.env.APOLLOS_GA_KEY;
      const analytics = buildDataSource();
      const result = await analytics.track({
        eventName: 'View Content',
      });
      expect(result).toMatchSnapshot();
      expect(mockTrack).toHaveBeenCalledTimes(1);

      expect(mockSend).toHaveBeenCalledTimes(0);
      expect(mockUA).toHaveBeenCalledTimes(0);
    });

    it('must track an event with a name and properties', async () => {
      const analytics = buildDataSource();
      const result = await analytics.track({
        eventName: 'View Content',
        anonymousId: 'deviceId5',
        properties: [{ field: 'ContentId', value: 7 }],
      });
      expect(result).toMatchSnapshot();
      expect(mockTrack).toHaveBeenCalledTimes(1);
      expect(mockTrack.mock.calls).toMatchSnapshot();

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockUA).toHaveBeenCalledTimes(1);
      expect(mockUA.mock.calls).toMatchSnapshot();
    });

    it('must track without a user', async () => {
      const analytics = buildDataSource(AuthWithoutUser);
      const result = await analytics.track({
        eventName: 'View Content',
      });
      expect(result).toMatchSnapshot();
      expect(mockTrack).toHaveBeenCalledTimes(1);
      expect(mockTrack.mock.calls).toMatchSnapshot();

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockUA).toHaveBeenCalledTimes(1);
      expect(mockUA.mock.calls).toMatchSnapshot();
    });

    it('must reraise a non-auth Error', () => {
      const analytics = buildDataSource({ getCurrentPerson: mockOtherError });
      const result = analytics.track({
        eventName: 'View Content',
      });
      expect(result).rejects.toThrow();

      expect(mockSend).toHaveBeenCalledTimes(0);
      expect(mockTrack).toHaveBeenCalledTimes(0);
    });
  });

  describe('identify', () => {
    it('must identify a user without traits', async () => {
      const analytics = buildDataSource();
      const result = await analytics.identify({
        anonymousId: 'deviceId5',
      });
      expect(result).toMatchSnapshot();
      expect(mockIdentify).toHaveBeenCalledTimes(1);
      expect(mockIdentify.mock.calls).toMatchSnapshot();

      expect(mockUA).toHaveBeenCalledTimes(0);
    });
    it('must identify a user with traits', async () => {
      const analytics = buildDataSource();
      const result = await analytics.identify({
        anonymousId: 'deviceId5',
        traits: [{ field: 'ChurchRole', value: 'Pastor' }],
      });
      expect(result).toMatchSnapshot();
      expect(mockIdentify).toHaveBeenCalledTimes(1);
      expect(mockIdentify.mock.calls).toMatchSnapshot();

      expect(mockUA).toHaveBeenCalledTimes(0);
    });
    it('must identify a user with device info', async () => {
      const analytics = buildDataSource();
      const result = await analytics.identify({
        anonymousId: 'deviceId5',
        deviceInfo: {
          platform: 'iOS',
          deviceId: 'gibberish',
          deviceMode: 'Latest iPhone',
          appVersion: '72.0.1',
        },
      });
      expect(result).toMatchSnapshot();
      expect(mockIdentify).toHaveBeenCalledTimes(1);
      expect(mockIdentify.mock.calls).toMatchSnapshot();

      expect(mockUA).toHaveBeenCalledTimes(0);
    });
  });
});
