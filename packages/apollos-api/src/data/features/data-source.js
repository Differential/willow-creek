import { Features as baseFeatures } from '@apollosproject/data-connector-rock';
import { get, flatten } from 'lodash';
import { createGlobalId } from '@apollosproject/server-core';
import ApollosConfig from '@apollosproject/config';
import moment from 'moment-timezone';

export default class Features extends baseFeatures.dataSource {
  ACTION_ALGORITHIMS = {
    // We need to make sure `this` refers to the class, not the `ACTION_ALGORITHIMS` object.
    PERSONA_FEED: this.personaFeedAlgorithm.bind(this),
    CONTENT_CHANNEL: this.contentChannelAlgorithm.bind(this),
    SERMON_CHILDREN: this.sermonChildrenAlgorithm.bind(this),
    UPCOMING_EVENTS: this.upcomingEventsAlgorithm.bind(this),
  };

  async personaFeedAlgorithm({
    contentChannelIds,
    first = 5,
    useSubtitle = true,
  }) {
    const { ContentItem } = this.context.dataSources;

    // Get the first three persona items.
    const personaFeed = await ContentItem.byPersonaFeedAndCampus({
      first,
      contentChannelIds,
    });

    const items = await personaFeed.orderBy('Priority').get();

    // Map them into specific actions.
    const featureListItems = await Promise.all(
      items.map(async (item, i) => {
        const relatedNode = await this.getRelatedNode({ item });

        if (!relatedNode) {
          return null;
        }

        return {
          id: createGlobalId(`${item.id}${i}`, 'ActionListAction'),
          title: item.title,
          subtitle: useSubtitle ? get(item, 'contentChannel.name') : '',
          relatedNode,
          image: ContentItem.getCoverImage(item),
          action: relatedNode.action,
        };
      })
    );

    return featureListItems.filter((item) => !!item);
  }

  async createActionListFeature({
    algorithms = [],
    title,
    subtitle,
    additionalAction,
  }) {
    // Generate a list of actions.
    // We should flatten just in case a single algorithm generates multiple actions
    const actions = flatten(
      await Promise.all(
        algorithms.map(async (algorithm) => {
          // Lookup the algorithm function, based on the name, and run it.
          if (typeof algorithm === 'object') {
            return this.ACTION_ALGORITHIMS[algorithm.type](algorithm.arguments);
          }
          return this.ACTION_ALGORITHIMS[algorithm]();
        })
      )
    );
    return {
      // The Feature ID is based on all of the action ids, added together.
      // This is naive, and could be improved.
      id: createGlobalId(
        actions
          .map(({ relatedNode: { id } }) => id)
          .reduce((acc, sum) => acc + sum, 0),
        'ActionListFeature'
      ),
      actions,
      title,
      subtitle,
      additionalAction,
      // Typanme is required so GQL knows specifically what Feature is being created
      __typename: 'ActionListFeature',
    };
  }

  async upcomingEventsAlgorithm() {
    const { Event, Person } = this.context.dataSources;

    const { campusId } = await Person.getCurrentUserCampusId();

    if (!campusId) {
      return [];
    }

    const events = await Event.getUpcomingEventsByCampus({
      campusId,
      limit: 3,
    });

    // Map them into specific actions.
    return events.map((event, i) => ({
      id: createGlobalId(`${event.id}${i}`, 'ActionListAction'),
      title: Event.getName(event),
      subtitle: moment(event.mostRecentOccurence) // we add the `mostRecentOccurence` field in the `getUpcomingEventsByCampus` method.
        .tz('America/Chicago')
        .format('MMMM Do YYYY'),
      relatedNode: { ...event, __type: 'Event' },
      image: Event.getImage(event),
      action: 'READ_EVENT',
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
        return { ...eventItem, __type: 'Event', action: 'READ_EVENT' };
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
