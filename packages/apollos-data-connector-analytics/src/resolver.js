export default {
  Mutation: {
    identifySelf: (root, { input }, { dataSources: { Analytics } }) =>
      Analytics.identify({ ...input }),
    trackEvent: (root, { input }, { dataSources: { Analytics } }) =>
      Analytics.track({ ...input }),
  },
};
