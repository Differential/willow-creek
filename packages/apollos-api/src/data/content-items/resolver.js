import { ContentItem } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';
import { createGlobalId } from '@apollosproject/server-core';

import { get } from 'lodash';

const { ROCK_MAPPINGS } = ApollosConfig;

const resolver = {
  ...ContentItem.resolver,
  Query: {
    ...ContentItem.resolver.Query,
    campaigns: async (root, args, { dataSources }) => {
      const cursor = await dataSources.ContentItem.byUserCampus({
        contentChannelIds: ROCK_MAPPINGS.CAMPAIGN_CHANNEL_IDS,
      });
      return dataSources.ContentItem.paginate({
        cursor,
        args,
      });
    },
    personaFeed: async (root, args, { dataSources }) =>
      dataSources.ContentItem.paginate({
        cursor: await dataSources.ContentItem.byPersonaFeed({
          contentChannelIds: ROCK_MAPPINGS.FEED_CONTENT_CHANNEL_IDS,
        }),
      }),
    userFeed: async (root, args, { dataSources }) => {
      const cursor = await dataSources.ContentItem.byUserCampus({
        contentChannelIds: ROCK_MAPPINGS.FEED_CONTENT_CHANNEL_IDS,
      });
      return dataSources.ContentItem.paginate({
        cursor,

        args,
      });
    },
  },
  WillowTVContentItem: {
    ...ContentItem.resolver.ContentItem,
    id: ({ id }, args, context, { parentType }) =>
      createGlobalId(`${id}`, parentType.name),

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
    liveStream: async (root, args, { dataSources }) => ({
      ...(await dataSources.LiveStream.getLiveStream()), // TODO: Wish there was a better way to inherit these defaults from the LiveStream module.
      isLive: await dataSources.ContentItem.isContentActiveLiveStream(root), // We need to override the global IsLive with an IsLive that is contextual to a ContentItem
    }),
    theme: (root, input, { dataSources }) =>
      dataSources.ContentItem.getTheme(root),
  },
  ContentItem: {
    ...ContentItem.resolver.ContentItem,
    theme: (root, input, { dataSources }) =>
      dataSources.ContentItem.getTheme(root),
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
