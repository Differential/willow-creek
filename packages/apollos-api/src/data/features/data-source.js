import { Feature as baseFeature } from '@apollosproject/data-connector-rock';
import { get, flatten } from 'lodash';
import { parseGlobalId } from '@apollosproject/server-core';
import ApollosConfig from '@apollosproject/config';
import moment from 'moment-timezone';
import semver from 'semver';

export default class Feature extends baseFeature.dataSource {
  ACTION_ALGORITHIMS = {
    // We need to make sure `this` refers to the class, not the `ACTION_ALGORITHIMS` object.
    // ...this.ACTION_ALGORITHIMS,
    PERSONA_FEED: this.personaFeedAlgorithm.bind(this),
    POINTER_FEED: this.pointerFeedAlgorithm.bind(this),
    USER_FEED: this.userFeedAlgorithm.bind(this),
    UPCOMING_EVENTS: this.upcomingEventsAlgorithm.bind(this),
    CAMPAIGN_ITEMS: this.campaignItemsAlgorithm.bind(this),
    CONTENT_CAMPUS_CHANNEL: this.contentCampusChannelAlgorithm.bind(this),
  };

  getHomeFeedFeatures = async ({ supportedTypes, campusId }) => {
    let features = get(ApollosConfig, 'HOME_FEATURES', []);
    if (this.context.clientVersion) {
      ApollosConfig.CLIENT_COMPATIBILITY.forEach(({ lt, HOME_FEATURES }) => {
        if (semver.lt(this.context.clientVersion, lt) && HOME_FEATURES) {
          features = HOME_FEATURES;
        }
      });
    }

    return Promise.all(
      features
        .filter(({ type }) => supportedTypes.includes(type))
        .map((featureConfig) => {
          const args = { ...featureConfig, campusId };
          switch (featureConfig.type) {
            case 'VerticalCardList':
              return this.createVerticalCardListFeature(args);
            case 'HorizontalCardList':
              return this.createHorizontalCardListFeature(args);
            case 'HeroListFeature':
              console.warn(
                'Deprecated: Please use the name "HeroList" instead. You used "HeroListFeature"'
              );
              return this.createHeroListFeature(args);
            case 'HeroList':
              return this.createHeroListFeature(args);
            case 'PrayerList':
              return this.createPrayerListFeature(args);
            case 'ActionList':
            default:
              // Action list was the default in 1.3.0 and prior.
              return this.createActionListFeature(args);
          }
        })
    );
  };

  async resolvePointers({ items }) {
    const { ContentItem } = this.context.dataSources;
    const featureListItems = await Promise.all(
      items.map(async (item, i) => {
        const relatedNode = await this.getRelatedNode({ item });

        if (!relatedNode) {
          return null;
        }

        return {
          id: `${item.id}${i}`,
          title: item.title,
          subtitle: get(item, 'attributeValues.subtitle.value', ''),
          relatedNode,
          image: ContentItem.getCoverImage(item),
          action: relatedNode.action,
        };
      })
    );

    return featureListItems.filter((item) => !!item);
  }

  async personaFeedAlgorithm({ contentChannelIds, first = 100 }) {
    this.setCacheHint({ maxAge: 0, scope: 'PRIVATE' });
    const { ContentItem } = this.context.dataSources;

    // Get the first three persona items.
    const personaFeed = await ContentItem.byPersonaFeedAndCampus({
      first,
      contentChannelIds,
    });

    const items = await personaFeed.orderBy('Priority').get();

    // Map them into specific actions.
    const pointers = await this.resolvePointers({ items });
    return (pointers || []).slice(0, first);
  }

  async campaignItemsAlgorithm({ limit = 1 } = {}) {
    const { ContentItem } = this.context.dataSources;

    const channels = await (await ContentItem.byUserCampus({
      contentChannelIds: ApollosConfig.ROCK_MAPPINGS.CAMPAIGN_CHANNEL_IDS,
    })).get();

    const allItems = flatten(
      await Promise.all(
        channels.map(async ({ id, title }) => {
          const childItemsCursor = await ContentItem.getCursorByParentContentItemId(
            id
          );

          const childItems = await childItemsCursor
            .top(limit)
            .expand('ContentChannel')
            .get();

          return childItems.map((item) => ({
            ...item,
            channelSubtitle: title,
          }));
        })
      )
    );

    const items = allItems.slice(0, 1);

    return items.map((item, i) => ({
      id: `${item.id}${i}`,
      title: item.title,
      subtitle: get(item, 'contentChannel.name'),
      relatedNode: { ...item, __type: ContentItem.resolveType(item) },
      image: ContentItem.getCoverImage(item),
      action: 'READ_CONTENT',
      summary: ContentItem.createSummary(item),
    }));
  }

  async userFeedAlgorithm({ limit = 20 } = {}) {
    const { ContentItem } = this.context.dataSources;

    const cursor = await ContentItem.byUserCampus({
      contentChannelIds: ApollosConfig.ROCK_MAPPINGS.FEED_CONTENT_CHANNEL_IDS,
    });

    const items = await cursor.top(limit).get();

    return items.map((item) => ({
      id: 'ActionListAction',
      title: item.title,
      subtitle: get(item, 'contentChannel.name'),
      relatedNode: { ...item, __type: ContentItem.resolveType(item) },
      image: ContentItem.getCoverImage(item),
      action: 'READ_CONTENT',
      summary: ContentItem.createSummary(item),
    }));
  }

  async pointerFeedAlgorithm({ contentChannelIds, first = 100 }) {
    const { ContentItem } = this.context.dataSources;

    // Get the first three items from the campus channel.
    const pointerItems = await ContentItem.byUserCampus({
      first,
      contentChannelIds,
    });

    const items = await pointerItems.orderBy('Priority').get();

    // Map them into specific actions.
    return this.resolvePointers({ items });
  }

  async upcomingEventsAlgorithm({ campusId }) {
    const { Event } = this.context.dataSources;

    if (!campusId) {
      return [];
    }

    const { id: parsedId } = parseGlobalId(campusId);

    const events = await Event.getUpcomingEventsByCampus({
      campusId: parsedId,
      limit: 3,
    });

    // Map them into specific actions.
    return events.map((event, i) => ({
      id: `${event.id}${i}`,
      title: Event.getName(event),
      subtitle: moment(event.mostRecentOccurence) // we add the `mostRecentOccurence` field in the `getUpcomingEventsByCampus` method.
        .tz('America/Chicago')
        .format('dddd, MMM D'),
      relatedNode: { ...event, __type: 'Event' },
      // image: Event.getImage(event),
      // Current app design calls for no user-supplied images.
      image: null,
      action: 'OPEN_URL',
    }));
  }

  async contentCampusChannelAlgorithm({ limit = null, contentChannelId }) {
    const { ContentItem } = this.context.dataSources;

    const cursor = await ContentItem.byUserCampus({
      contentChannelIds: [contentChannelId],
      fallback: () => ContentItem.byContentChannelId(contentChannelId),
    });

    const items = limit ? await cursor.top(limit).get() : await cursor.get();

    return items.map((item, i) => ({
      id: `${item.id}${i}`,
      title: item.title,
      subtitle: get(item, 'contentChannel.name'),
      relatedNode: { ...item, __type: ContentItem.resolveType(item) },
      image: ContentItem.getCoverImage(item),
      action: 'READ_CONTENT',
      summary: ContentItem.createSummary(item),
    }));
  }

  async getRelatedNode({ item }) {
    const { POINTER_CHANNEL_TYPE_ID } = ApollosConfig.ROCK_MAPPINGS;
    const { Event, ContentItem } = this.context.dataSources;

    if (item.contentChannelTypeId !== POINTER_CHANNEL_TYPE_ID)
      return { ...item, __type: ContentItem.resolveType(item) };

    const { contentItem, event, url } = item.attributeValues;

    if (contentItem.value) {
      const node = await ContentItem.request()
        .filter(`Guid eq guid'${contentItem.value}'`)
        .first();
      return {
        ...node,
        __type: ContentItem.resolveType(node),
        action: 'READ_CONTENT',
      };
    }

    if (event.value) {
      const idMatch = event.value.match(/EventOccurrenceId=(\d+)/);
      if (!idMatch || !idMatch[1]) {
        return null;
      }
      const eventItem = await Event.getFromId(idMatch[1]);

      if (eventItem) {
        return { ...eventItem, __type: 'Event', action: 'OPEN_URL' };
      }
    }

    if (url.value) {
      return {
        __type: 'LinkFeature',
        url: url.value,
        id: url.value,
        action: 'OPEN_URL',
      };
    }

    return null;
  }
}
