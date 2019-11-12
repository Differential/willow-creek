import { ContentItem, Followings } from '@apollosproject/data-connector-rock';
import ApollosConfig from '@apollosproject/config';
import { createGlobalId, resolverMerge } from '@apollosproject/server-core';
import { get } from 'lodash';

const { ROCK_MAPPINGS } = ApollosConfig;

const contentItemOverrides = {
  siblingContentItemsConnection: async ({ id }, args, { dataSources }) => {
    // For the time being, we don't have a endpoint that will both return items by ID and filter by an attribute value
    // Thus, we need to do our campus filtering in the JS.
    const items = await dataSources.ContentItem.paginate({
      cursor: await dataSources.ContentItem.getCursorBySiblingContentItemId(id),
      args,
    });
    const unfilteredEdges = await items.edges;
    const { campusGuid } = await dataSources.Person.getCurrentUserCampusId();
    const edges = unfilteredEdges.filter((item) =>
      get(item, 'node.attributeValues.campus.value').includes(campusGuid)
    );
    return { edges };
  },
  childContentItemsConnection: async ({ id }, args, { dataSources }) => {
    const items = await dataSources.ContentItem.paginate({
      cursor: await dataSources.ContentItem.getCursorByParentContentItemId(id),
      args,
    });
    const unfilteredEdges = await items.edges;
    const { campusGuid } = await dataSources.Person.getCurrentUserCampusId();
    const edges = unfilteredEdges.filter((item) =>
      get(item, 'node.attributeValues.campus.value').includes(campusGuid)
    );
    return { edges };
  },
};

const resolver = {
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
  ContentChannel: {
    childContentItemsConnection: async ({ id }, args, { dataSources }) =>
      dataSources.ContentItem.paginate({
        cursor: await dataSources.ContentItem.byUserCampus({
          contentChannelIds: [id],
          fallback: () => dataSources.ContentItem.byContentChannelId(id),
        }),
        args,
      }),
  },
  WillowTVContentItem: {
    ...ContentItem.resolver.ContentItem,
    ...Followings.resolver.UniversalContentItem,
    ...contentItemOverrides,
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
    ...contentItemOverrides,
    theme: (root, input, { dataSources }) =>
      dataSources.ContentItem.getTheme(root),
  },
  ContentSeriesContentItem: {
    ...contentItemOverrides,
  },
  DevotionalContentItem: {
    ...contentItemOverrides,
  },
  MediaContentItem: {
    ...contentItemOverrides,
  },
  UniversalContentItem: {
    ...contentItemOverrides,
  },
  WeekendContentItem: {
    ...contentItemOverrides,
  },
};

export default resolverMerge(resolver, ContentItem);
