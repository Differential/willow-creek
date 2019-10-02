import { Features as baseFeatures } from '@apollosproject/data-connector-rock';
import { get } from 'lodash';
import { createGlobalId } from '@apollosproject/server-core';

export default class Features extends baseFeatures.dataSource {
  ACTION_ALGORITHIMS = {
    // We need to make sure `this` refers to the class, not the `ACTION_ALGORITHIMS` object.
    PERSONA_FEED: this.personaFeedAlgorithm.bind(this),
    SINGLE_PERSONA: this.singlePersonaAlgorithm.bind(this),
    CONTENT_CHANNEL: this.contentChannelAlgorithm.bind(this),
    SERMON_CHILDREN: this.sermonChildrenAlgorithm.bind(this),
    UPCOMING_EVENTS: this.upcomingEventsAlgorithm.bind(this),
  };

  async singlePersonaAlgorithm({ personaIds, contentChannelIds, first = 3 }) {
    const { ContentItem } = this.context.dataSources;

    // Get the first three persona items.
    const personaFeed = await ContentItem.byPersonaIds({
      personaIds,
      first,
      contentChannelIds,
    });
    const items = await personaFeed.get();

    // Map them into specific actions.
    return items.map((item, i) => ({
      id: createGlobalId(`${item.id}${i}`, 'ActionListAction'),
      title: item.title,
      subtitle: get(item, 'contentChannel.name'),
      relatedNode: { ...item, __type: ContentItem.resolveType(item) },
      image: ContentItem.getCoverImage(item),
      action: 'READ_CONTENT',
    }));
  }
}
