import { DefaultCard } from '@apollosproject/ui-kit';
import React from 'react';
import moment from 'moment';

const EventCard = ({ name, image, start, end }) => (
  <DefaultCard
    title={name}
    coverImage={image && image.sources}
    summary={`${moment(start).format('ddd, MMMM Do, YYYY')} \n\n${moment(
      start
    ).format('LT')} — ${moment(end).format('LT')}`}
  />
);

export default EventCard;
