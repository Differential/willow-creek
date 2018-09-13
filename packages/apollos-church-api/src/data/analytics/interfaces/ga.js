import ua from 'universal-analytics';
import BaseAnalytics from './base';

export default class GoogleAnalytics extends BaseAnalytics {
  constructor(accountId) {
    super();
    this.accountId = accountId;
  }

  track({ event, anonymousId }) {
    const visitor = ua(this.accountId, anonymousId, { strictCidFormat: false });
    visitor.event('Apollos App', event).send();
  }
}
