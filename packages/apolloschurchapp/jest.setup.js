jest.mock('./src/client/index');
jest.mock('./src/config', () => ({
  ONE_SIGNAL_KEY: 'doesntmatter',
}));
jest.mock('react-native-custom-tabs', () => ({
  CustomTabs: {
    openURL: jest.fn(),
  },
}));

jest.mock('react-native-safari-view', () => ({
  isAvailable: jest.fn().mockImplementation(() => Promise.resolve(true)),
  show: jest.fn(),
}));

jest.mock('react-native-onesignal');
jest.mock('react-native-music-control', () => ({
  enableBackgroundMode: jest.fn(),
  enableControl: jest.fn(),
  on: jest.fn(),
  setNowPlaying: jest.fn(),
}));

jest.mock('react-native-device-info', () => ({
  getUniqueID: () => 'id-123',
  getSystemVersion: () => 'sys-version-123',
  getModel: () => 'ios',
  getVersion: () => 'version-123',
  getBuildNumber: () => 0,
}));

jest.mock('react-native-video', () => 'Video');
