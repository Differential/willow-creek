jest.mock('client');
jest.mock('react-native-custom-tabs', () => ({
  CustomTabs: {
    openURL: jest.fn(),
  },
}));

jest.mock('react-native-safari-view', () => ({
  isAvailable: jest.fn().mockImplementation(() => Promise.resolve(true)),
  show: jest.fn(),
}));

jest.mock('react-native-video', () => 'Video');
