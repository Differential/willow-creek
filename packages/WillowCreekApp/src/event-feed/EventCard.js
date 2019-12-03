import { ContentCard, withThemeMixin } from '@apollosproject/ui-kit';
import React from 'react';
import moment from 'moment';

const EventCard = withThemeMixin(({ theme }) => ({
  colors: { background: { accent: theme.colors.white } },
}))(({ name, image, start, end }) => (
  <ContentCard
    title={name}
    coverImage={image && image.sources}
    summary={
      start &&
      `${moment(start).format('ddd, MMMM Do, YYYY')} \n\n${moment(start).format(
        'LT'
      )} — ${moment(end).format('LT')}`
    }
  />
));

export default EventCard;
