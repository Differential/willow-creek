import { FeatureFeed as coreFeatureFeed } from '@apollosproject/data-connector-rock';

const { schema, resolver } = coreFeatureFeed;

class FeatureFeed extends coreFeatureFeed.dataSource {
  baseGetFeed = this.getFeed;

  // this will also embed campus into the feature feed id
  getFeed = async ({ type, args }) => {
    const {
      campusId,
    } = await this.context.dataSources.Person.getCurrentUserCampusId();
    return this.baseGetFeed({ type, args: { ...args, campusId } });
  };
}

export { resolver, schema, FeatureFeed as dataSource };
