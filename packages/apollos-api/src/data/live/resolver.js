export default {
  Query: {
    liveStream: (root, args, { dataSources }) =>
      dataSources.LiveStream.getLiveStream(),
  },
  LiveStream: {
    isLive: ({ islive }) => islive,
    eventStartTime: () => null,
    stream: ({ url, name, img }) => ({
      sources: [{ uri: url.replace('http:', 'https:') }],
      label: name,
      thumbnail: { uri: img },
    }),
  },
};
