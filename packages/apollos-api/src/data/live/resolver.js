export default {
  Query: {
    liveStream: (root, args, { dataSources }) =>
      dataSources.LiveStream.getLiveStream(),
  },
  // LiveStream: {
  //   isLive: (root, arg, { dataSources }) =>
  //     dataSources.LiveStream.getIsLive({
  //       channelId: 'UCSJ4gkVC6NrvII8umztf0Ow',
  //     }),
  //   eventStartTime: () => null,
  //   stream: ({ url, name, img }) => ({
  //     sources: [{ uri: url.replace('http:', 'https:') }],
  //     label: name,
  //     thumbnail: { uri: img },
  //   }),
  // },
};
