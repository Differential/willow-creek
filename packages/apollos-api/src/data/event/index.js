import { Event } from '@apollosproject/data-connector-rock';
import ical from 'node-ical';
import moment from 'moment-timezone';
import ApollosConfig from '@apollosproject/config';
import { resolverMerge } from '@apollosproject/server-core';
import gql from 'graphql-tag';

const schema = gql`
  extend type Event {
    url: String
  }

  ${Event.schema}
`;

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
      url: (root) =>
        `https://rock.willowcreek.org/page/439?EventOccurrenceId=${root.id}`,
    },
  },
  Event
);

async function getMostRecentOccurenceForEvent(event) {
  // Let's grab the iCal content
  const iCal = event.schedule.iCalendarContent;
  const iCalEvent = Object.values(await ical.async.parseICS(iCal))[0];

  // Default the start date to the iCal's reported state date
  let mostRecentOccurence = moment.tz(
    iCalEvent.start,
    ApollosConfig.ROCK.TIMEZONE
  );

  // Dates returned from `iCal` are parsed if they are in UTC.
  // We need to find the difference between the times returned and the correct time.
  // And then offset by that time.
  const tzOffset = moment.tz
    .zone(ApollosConfig.ROCK.TIMEZONE)
    .utcOffset(mostRecentOccurence);

  mostRecentOccurence = mostRecentOccurence.add(tzOffset, 'minutes').toDate();

  // Sometimes we have a "recurring rule"
  if (iCalEvent.rrule) {
    // Using the embeded RRule JS library, let's grab the next time this event occurs.
    // console.log(iCalEvent.rrule.after(new Date()));
    mostRecentOccurence = moment.tz(
      iCalEvent.rrule.after(new Date()),
      ApollosConfig.ROCK.TIMEZONE
    );

    const offset = moment.tz
      .zone(ApollosConfig.ROCK.TIMEZONE)
      .utcOffset(mostRecentOccurence);

    mostRecentOccurence = mostRecentOccurence.add(offset, 'minutes').toDate();

    // console.log({ mostRecentOccurence }, 'rrule');
    // Rock also likes to throw events inside this rdate property in the iCal string.
  } else if (iCalEvent.rdate) {
    // rdate's aren't supported by the iCal library. Let's parse them ourselves.
    mostRecentOccurence = iCalEvent.rdate
      .split(',') // Take a list of values
      .map((d) => moment.tz(d, ApollosConfig.ROCK.TIMEZONE).toDate()) // Use moment to parse them into dates
      .find((d) => d > new Date()); // Now find the one that happens soonest (it's already sorted by earliest to latest)
  }
  // We should have _something_ at this point. Return it!
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

    // Phew - this gets tricky. We have to parse the iCal to figure out the REAL start date
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
    if (!schedule) {
      return { start: null, end: null };
    }

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

  // overrides a core method
  getByCampus = async (id) => this.getUpcomingEventsByCampus({ campusId: id });
}

export { schema, resolver, dataSource };
