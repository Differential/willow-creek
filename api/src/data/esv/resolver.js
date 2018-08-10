export default {
  Query: {
    scripture: (root, { query }, { dataSources }) =>
      dataSources.scripture.getScripture(query),
  },
  ESVScripture: {
    html: ({ passages }) => passages[0],
  },
};
