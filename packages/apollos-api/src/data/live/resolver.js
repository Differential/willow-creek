export default {
  Query: {
    liveStream: (root, args, { dataSources }) =>
      dataSources.LiveStream.getLiveStream(),
    liveStreams: (root, args, { dataSources }) =>
      dataSources.LiveStream.getLiveStreams(),
  },
  LiveStream: {
    contentItem: async (root, args, { dataSources }) => {
      if (root.contentItem) {
        return root.contentItem;
      }
      return dataSources.ContentItem.byUserCampus({
        contentChannelIds: [16],
      }).first();
    },
  },
};
