import { FeatureFeed as coreFeatureFeed } from '@apollosproject/data-connector-rock';

const { schema, dataSource } = coreFeatureFeed;

const resolver = {
  ...coreFeatureFeed.resolver,
  Query: {
    homeFeedFeatures: async (
      root,
      args,
      { dataSources: { FeatureFeed, Person } }
    ) => {
      // pops currentPerson into the context
      await Person.getCurrentUserCampusId();

      return FeatureFeed.getFeed({
        type: 'apollosConfig',
        args: { section: 'HOME_FEATURES' },
      });
    },
    discoverFeedFeatures: async (
      root,
      args,
      { dataSources: { FeatureFeed, Person } }
    ) => {
      // pops currentPerson into the context
      await Person.getCurrentUserCampusId();

      return FeatureFeed.getFeed({
        type: 'apollosConfig',
        args: { section: 'DISCOVER_FEATURES' },
      });
    },
  },
};

export { resolver, schema, dataSource };
