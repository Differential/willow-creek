import Analytics from 'analytics-node';
import BaseAnalytics from './base';

export default class GoogleAnalytics extends BaseAnalytics {
  constructor(writeKey) {
    super();
    this.client = new Analytics(writeKey);
  }

  shouldIdentify = true;

  identify({ anonymousId, userId, traits, context }) {
    this.client.identify({
      anonymousId,
      userId,
      traits,
      context,
    });
  }

  track({ event, anonymousId, userId, properties, context }) {
    this.client.track({
      event,
      anonymousId,
      userId,
      properties,
      context,
    });
  }
}
