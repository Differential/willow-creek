/* eslint-disable camelcase */
import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';
import decode from 'unescape';

export { default as dataSource } from './data-source';

export const schema = gql`
  type WillowTVContentItem implements Node & ContentItem {
    id: ID!
    title: String
    coverImage: ImageMedia
    images: [ImageMedia]
    videos: [VideoMedia]
    audios: [AudioMedia]
    htmlContent: String
    summary: String
    childContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    siblingContentItemsConnection(
      first: Int
      after: String
    ): ContentItemsConnection
    parentChannel: ContentChannel
    sharing: SharableContentItem
    theme: Theme
    likedCount: Int
    isLiked: Boolean
  }

  extend type Query {
    tvFeed: ContentItemsConnection
  }
`;

export const resolver = {
  Query: {
    tvFeed: (root, args, { dataSources }) => ({
      edges: dataSources.WillowTVContentItem.getArchives().then((archives) =>
        archives.map((node) => ({ node }))
      ),
    }),
  },
  WillowTVContentItem: {
    id: ({ url }, args, context, { parentType }) =>
      createGlobalId(`${url}`, parentType.name),
    title: ({ name }) => decode(name),
    coverImage: ({ img }) => ({
      __typename: 'ImageMedia',
      sources: [{ uri: img }],
    }),
    images: ({ img }) => [
      {
        __typename: 'ImageMedia',
        sources: [{ uri: img }],
      },
    ],
    audios: [],
    videos: ({ streamtype, streamurl, additionalFeatures }) => [
      {
        __typename: 'VideoMedia',
        key: streamtype,
        label: 'Full Verison',
        sources: [{ uri: streamurl }],
      },
      ...additionalFeatures.map(
        ({ streamtype: key, streamurl: uri, description: label }) => ({
          __typename: 'VideoMedia',
          key,
          label,
          sources: [{ uri }],
        })
      ),
    ],
    htmlContent: ({ description }) => description,
    summary: ({ description }) => description,
    childContentItemsConnection: () => null,
    siblingContentItemsConnection: () => null,
    parentChannel: ({ series_name }) => ({
      __typename: 'ContentChannel',
      id: createGlobalId(series_name, 'ContentChannel'),
      name: series_name,
      description: null,
      childContentChannels: [],
      childContentItemsConnection: null,
      iconName: 'play',
    }),
    sharing: ({ url, name, description }) => ({
      __typename: 'SharableContentItem',
      url,
      title: name,
      message: description,
    }),
    theme: () => null,
    likedCount: () =>
      null /* ({ series_name, name, date }, args, { dataSources }) =>
      dataSources.Interactions.getCountByOperationForContentItem({
        contentItemId: createGlobalId(
          `${series_name}${name}${date}`,
          'WillowTVContentItem'
        ),
        operation: 'Like',
      }), */,
    isLiked: () =>
      null /* ({ series_name, name, date }, ...args) =>
      ContentItem.resolver.UniversalContentItem.isLiked(
        {
          id: createGlobalId(
            `${series_name}${name}${date}`,
            'WillowTVContentItem'
          ),
        },
        ...args
      ), */,
  },
};
