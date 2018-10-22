import { get } from 'lodash';

export default {
  Query: {
    scripture: (root, { query }, { dataSources }) =>
      dataSources.Scripture.getScripture(query),
  },
  Scripture: {
    id: ({ data: { passages } = {} }) => get(passages, '[0].id'),
    html: ({ data: { passages } = {} }) => get(passages, '[0].content'),
    reference: ({ data: { passages } = {} }) => get(passages, '[0].reference'),
    copyright: ({ data: { passages } = {} }) => get(passages, '[0].copyright'),
  },
};
