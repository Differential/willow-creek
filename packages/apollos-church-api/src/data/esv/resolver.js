export default {
  Query: {
    scripture: (root, { query }, { dataSources }) =>
      dataSources.Scripture.getScripture(query),
  },
  ESVScripture: {
    html: ({ passages }) => passages[0],
  },
};
