import RockApolloDataSource from '@apollosproject/rock-apollo-data-source';

export default class CalendarEvents extends RockApolloDataSource {
  resource = 'WillowCalendarEvents';

  getUpcoming = () =>
    this.request()
      .find(new Date().getFullYear())
      .filter(`EventEndDateTime ge datetime'${new Date().toISOString()}'`)
      .cache({ ttl: 86400 })
      .get();
}
