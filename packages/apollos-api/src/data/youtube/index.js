/* eslint-disable camelcase */
import gql from 'graphql-tag';
import { createGlobalId } from '@apollosproject/server-core';
import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';

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
    tvFeed: async (root, args, { dataSources }) => {
      const cursor = await dataSources.ContentItem.getContentItemsForCampus();
      return dataSources.ContentItem.paginate({
        cursor: cursor.andFilter(
          `ContentChannelId eq ${ApollosConfig.ROCK_MAPPINGS.YOUTUBE_CONTENT_CHANNEL}`
        ),
        args,
      });
    },
  },
  WillowTVContentItem: {
    ...ContentItem.resolver.ContentItem,
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(`${id}`, parentType.name),
    coverImage: async (
      { attributeValues },
      args,
      { dataSources: { Youtube } }
    ) => {
      const { snippet } = await Youtube.getFromId(
        attributeValues.youtubeId.value
      );

      const sources = Object.keys(snippet.thumbnails).map((key) => ({
        uri: snippet.thumbnails[key].url,
      }));

      return {
        __typename: 'ImageMedia',
        sources,
      };
    },

    videos: ({
      attributeValues: {
        youtubeId: { value },
      },
    }) => [
      {
        __typename: 'VideoMedia',
        key: 'youtube',
        label: 'Watch now',
        youtubeId: value,
        sources: [],
      },
    ],

    siblingContentItemsConnection: () => null,

    sharing: ({
      title,
      attributeValues: {
        youtubeId: { value },
      },
    }) => ({
      __typename: 'SharableContentItem',
      url: `https://www.youtube.com/watch?v=${value}`,
      title,
      message: null,
    }),

    theme: () => null,
    likedCount: () => null, // TODO: How to expose youtube stats?
    isLiked: () => null,
  },
};
