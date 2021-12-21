module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts/'], // stays the same
  dependencies: {
    'react-native-passkit-wallet': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
    '@metarouter/analytics-react-native': {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
        ios: null,
      },
    },
  },
};
