export default {
  Query: {
    liveStream: (root, args, { dataSources }) =>
      dataSources.LiveStream.getLiveStream(),
  },
  LiveStream: {
    isLive: ({ response: { item: { isLive } = {} } = {} }) => isLive,
    eventStartTime: ({ response: { item: { eventStartTime } = {} } = {} }) =>
      eventStartTime,
  },
};
