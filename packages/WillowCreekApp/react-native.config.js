module.exports = {
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
