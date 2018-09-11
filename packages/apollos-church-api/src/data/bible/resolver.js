import { get } from 'lodash';

export default {
  Query: {
    scripture: (root, { query }, { dataSources }) =>
      dataSources.Scripture.getScripture(query),
  },
  Scripture: {
    reference: ({ data: { reference } = {} }) => reference,
    html: ({ data: { passages } = {} }) => get(passages, '[0].content'),
  },
};
