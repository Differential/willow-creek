/* eslint-disable camelcase */
import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';

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

  extend type VideoMedia {
    youtubeId: String
  }

  extend type Query {
    tvFeed: ContentItemsConnection
  }
`;

export const resolver = {
  Query: {
    tvFeed: (root, args, { dataSources }) => ({
      edges: dataSources.Youtube.getPlaylistItemsForCampus().then(
        ({ items = [] } = {}) => items.map((node) => ({ node }))
      ),
    }),
  },
  WillowTVContentItem: {
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(`${id}`, parentType.name),
    title: ({ snippet }) => snippet.title,

    coverImage: ({ snippet }) => {
      const sources = Object.keys(snippet.thumbnails).map((key) => ({
        uri: snippet.thumbnails[key].url,
      }));

      return {
        __typename: 'ImageMedia',
        sources,
      };
    },

    videos: ({ id }) => [
      {
        __typename: 'VideoMedia',
        key: 'youtube',
        label: 'Watch now',
        youtubeId: id,
        sources: [],
      },
    ],

    htmlContent: ({ snippet }) => snippet.description,
    summary: ({ snippet }) => snippet.description,

    siblingContentItemsConnection: () => null,

    parentChannel: () => ({
      __typename: 'ContentChannel',
      id: async (root, args, { dataSources }) => {
        const id = await dataSources.Youtube.getPlaylistIdForCampus();
        return createGlobalId(id, 'ContentChannel');
      },
      name: 'TODO - Channel Name',
      description: 'TODO - Channel Description',
      childContentChannels: [],
      iconName: 'play',
    }),

    sharing: ({ id, snippet }) => ({
      __typename: 'SharableContentItem',
      url: `https://www.youtube.com/watch?v=${id}`,
      title: snippet.title,
      message: snippet.description,
    }),

    theme: () => null,
    likedCount: () => null, // TODO: How to expose youtube stats?
    isLiked: () => null,
  },
};
