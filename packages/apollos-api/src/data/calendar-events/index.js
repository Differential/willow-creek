/* eslint-disable camelcase */
import gql from 'graphql-tag';
import { uniqBy } from 'lodash';
import { createGlobalId } from '@apollosproject/server-core';

export { default as dataSource } from './data-source';

export const schema = gql`
  type WillowCalendarEventContentItem implements Node & ContentItem {
    id: ID!
    title(hyphenated: Boolean): String
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
    upcomingEvents: [WillowCalendarEventContentItem]
  }
`;

export const resolver = {
  Query: {
    upcomingEvents: async (a, b, { dataSources }) => {
      let all = await dataSources.WillowCalendarEventContentItem.getUpcoming();
      all = all.filter(({ ministries }) => ministries.includes('Featured'));
      all = uniqBy(
        all,
        ({ eventOccurenceId, eventItemId }) =>
          `${eventOccurenceId}${eventItemId}`
      );
      return all.slice(0, 5);
    },
  },
  WillowCalendarEventContentItem: {
    id: ({ eventOccurenceId, eventItemId }, args, context, { parentType }) =>
      createGlobalId(`${eventOccurenceId}${eventItemId}`, parentType.name),
    title: ({ eventName }) => eventName,
    coverImage: ({ photo }) =>
      photo && typeof photo === 'string'
        ? {
            __typename: 'ImageMedia',
            sources: [
              { uri: photo.replace('https://portaldemo', 'http://rockdemo') },
            ],
          }
        : null,
    images: [],
    audios: [],
    videos: [],
    htmlContent: ({ description }) => description,
    summary: ({ summary }) => summary,
    childContentItemsConnection: () => null,
    siblingContentItemsConnection: () => null,
    parentChannel: ({ campusName, scheduleId }) => ({
      __typename: 'ContentChannel',
      id: createGlobalId(scheduleId, 'ContentChannel'),
      name: campusName,
      description: null,
      childContentChannels: [],
      childContentItemsConnection: null,
      iconName: 'calendar',
    }),
    sharing: ({ eventName, summary, eventOccurrenceId }) => ({
      __typename: 'SharableContentItem',
      url: `https://rock.willowcreek.org/page/439?EventOccurrenceId=${eventOccurrenceId}`,
      title: eventName,
      message: summary,
    }),
    theme: () => null,
    likedCount: () => null, // ContentItem.resolver.UniversalContentItem.likedCount,
    isLiked: () => null, // ContentItem.resolver.UniversalContentItem.isLiked,
  },
  SharableContentItem: {
    url: ({ url = null }) => url,
    // todo: return a dynamic url that links to the content item
    title: ({ title = null }) => title,
    message: ({ message = null }) => message,
  },
};
