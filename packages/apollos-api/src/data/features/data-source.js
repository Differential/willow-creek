import { Features as baseFeatures } from '@apollosproject/data-connector-rock';
import { get } from 'lodash';
import { createGlobalId } from '@apollosproject/server-core';
import ApollosConfig from '@apollosproject/config';

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
    first = 3,
    useSubtitle = true,
  }) {
    const { ContentItem } = this.context.dataSources;

    // Get the first three persona items.
    const personaFeed = await ContentItem.byPersonaFeedAndCampus({
      first,
      contentChannelIds,
    });

    const items = await personaFeed.get();

    // Map them into specific actions.
    return Promise.all(
      items.map(async (item, i) => {
        const relatedNode = await this.getRelatedNode({ item });

        return {
          id: createGlobalId(`${item.id}${i}`, 'ActionListAction'),
          title: item.title,
          subtitle: useSubtitle ? get(item, 'contentChannel.name') : '',
          relatedNode,
          image: ContentItem.getCoverImage(item),
          action:
            relatedNode.__type === 'Event' ? 'READ_EVENT' : 'READ_CONTENT',
        };
      })
    );
  }

  async upcomingEventsAlgorithm() {
    const { Event, Person } = this.context.dataSources;

    const { campusId } = await Person.getCurrentUserCampusId();

    if (!campusId) {
      return [];
    }

    // Get the first three persona items.
    const events = await Event.findRecent()
      .andFilter(`CampusId eq ${campusId}`)
      .andFilter(
        `Schedule/EffectiveEndDate ge datetime'${new Date().toISOString()}'`
      )
      .top(3)
      .get();

    console.log(events);
    // Map them into specific actions.
    return events.map((event, i) => ({
      id: createGlobalId(`${event.id}${i}`, 'ActionListAction'),
      title: Event.getName(event),
      subtitle: Event.getDateTime(event.schedule).start,
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

    const { contentItem, event } = item.attributeValues;

    if (contentItem.value) {
      const node = await ContentItem.request()
        .filter(`Guid eq guid'${contentItem.value}'`)
        .first();
      return { ...node, __type: ContentItem.resolveType(node) };
    }

    if (event.value) {
      const idMatch = event.value.match(/EventOccurrenceId=(\d+)/);
      if (!idMatch || !idMatch[1]) {
        return null;
      }
      const eventItem = await Event.getFromId(idMatch[1]);

      if (eventItem) {
        return { ...eventItem, __type: 'Event' };
      }
    }

    return null;
  }
}
