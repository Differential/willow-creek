import { Event } from '@apollosproject/data-connector-rock';
import ical from 'node-ical';
import moment from 'moment-timezone';
import ApollosConfig from '@apollosproject/config';
import { resolverMerge } from '@apollosproject/server-core';

const { schema } = Event;

const resolver = resolverMerge(
  {
    Event: {
      start: async (root, event, { dataSources }) => {
        const times = await dataSources.Event.getDateTime(root.schedule);
        return times.start;
      },
      end: async (root, event, { dataSources }) => {
        const times = await dataSources.Event.getDateTime(root.schedule);
        return times.end;
      },
    },
  },
  Event
);

async function getMostRecentOccurenceForEvent(event) {
  const iCal = event.schedule.iCalendarContent;
  const iCalEvent = Object.values(await ical.async.parseICS(iCal))[0];
  let mostRecentOccurence = iCalEvent.start;
  if (iCalEvent.rrule) {
    mostRecentOccurence = new Date(iCalEvent.rrule.after(new Date()));
  } else if (iCalEvent.rdate) {
    mostRecentOccurence = iCalEvent.rdate
      .split(',')
      .map((d) => moment(d).toDate())
      .find((d) => d > new Date());
  }
  return mostRecentOccurence;
}

class dataSource extends Event.dataSource {
  async getUpcomingEventsByCampus({ limit = null, campusId } = {}) {
    // Get the first three persona items.
    const events = await this.findRecent()
      .andFilter(`CampusId eq ${campusId}`)
      .andFilter(
        `(Schedule/EffectiveEndDate ge datetime'${new Date().toISOString()}' or Schedule/EffectiveEndDate eq null)`
      )
      .get();

    const eventsWithMostRecentOccurence = await Promise.all(
      events.map(async (event) => ({
        ...event,
        mostRecentOccurence: await getMostRecentOccurenceForEvent(event),
      }))
    );

    const sortedEvents = eventsWithMostRecentOccurence.sort(
      (a, b) =>
        a.mostRecentOccurence.getTime() - b.mostRecentOccurence.getTime()
    );

    if (limit != null) {
      return sortedEvents.slice(0, 3);
    }
    return sortedEvents;
  }

  // eslint-disable-next-line class-methods-use-this
  getDateTime = async (schedule) => {
    const iCal = schedule.iCalendarContent;
    const dateTimes = iCal.match(/DTEND:(\w+).*DTSTART:(\w+)/s);
    const start = await getMostRecentOccurenceForEvent({ schedule });

    return {
      start: moment(start)
        .utc()
        .format(),
      end: moment
        .tz(dateTimes[1], ApollosConfig.ROCK.TIMEZONE)
        .utc()
        .format(),
    };
  };
}

export { schema, resolver, dataSource };
