export default {
  Query: {
    scripture: (root, { query }, { dataSources }) =>
      dataSources.Scripture.getScripture(query),
  },
  Scripture: {
    reference: ({ data: { reference } = {} }) => reference,
    content: ({ data: { content } = {} }) => content,
  },
};
