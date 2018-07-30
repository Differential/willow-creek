export default {
  Query: {
    liveStream: (root, args, { dataSources }) =>
      dataSources.liveStream.getLiveStream(),
  },
  LiveStream: {
    isLive: ({ response: { item: { isLive } = {} } = {} }) => isLive,
    eventStartTime: ({ response: { item: { eventStartTime } = {} } = {} }) =>
      eventStartTime,
  },
};
