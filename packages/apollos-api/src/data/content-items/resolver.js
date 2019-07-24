import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';
import { createGlobalId } from '@apollosproject/server-core';

import { get } from 'lodash';

const { ROCK_MAPPINGS } = ApollosConfig;

const resolver = {
  ...ContentItem.resolver,
  Query: {
    ...ContentItem.resolver.Query,
    growCampaign: async (root, args, { dataSources }) =>
      dataSources.ContentItem.paginate({
        cursor: await dataSources.ContentItem.getCursorByParentContentItemId([
          ROCK_MAPPINGS.GROW_FEATURE_ITEM_ID,
        ]),
        args,
      }),
    myWillowCampaign: async (root, args, { dataSources }) =>
      dataSources.ContentItem.paginate({
        cursor: await dataSources.ContentItem.getCursorByParentContentItemId([
          ROCK_MAPPINGS.MY_WILLOW_FEATURE_ITEM_ID,
        ]),
        args,
      }),
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
  ContentItem: {
    ...ContentItem.resolver.ContentItem,
    __resolveType: async (attrs, ...otherProps) => {
      if (get(attrs, 'attributeValues.youtubeId.value', '') !== '') {
        return 'WillowTVContentItem';
      }
      if (Object.hasOwnProperty.call(attrs, 'eventOccurrenceId'))
        return 'WillowCalendarEventContentItem';
      // if (
      //   Object.hasOwnProperty.call(attrs, 'kind') &&
      //   attrs.kind.includes('youtube')
      // )
      //   return 'WillowTVContentItem';
      return ContentItem.resolver.ContentItem.__resolveType(
        attrs,
        ...otherProps
      );
    },
  },
};

export default resolver;
