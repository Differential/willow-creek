import BaseAnalytics from './base';

export default class RockInteractionAnalytics extends BaseAnalytics {
  eventWhitelist = ['View Content'];

  track({ event, userId, properties }) {
    if (!userId) {
      return null;
    }
    switch (event) {
      case 'View Content': {
        return this.trackViewContent({
          contentId: properties.ContentId,
          sessionId: properties.SessionId,
        });
      }
      default:
        console.log(`${event} not supported by RockInteraction Analytics`);
        return null;
    }
  }

  trackViewContent({ contentId, sessionId }) {
    if (!contentId || !sessionId) {
      console.log('No ContentId or SessionId included in `track` call.');
      return null;
    }
    return this.context.dataSources.Interactions.createInteraction({
      nodeId: contentId,
      sessionId,
      operationName: 'View Content',
    });
  }
}
