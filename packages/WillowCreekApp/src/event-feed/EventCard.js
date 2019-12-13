import React from 'react';
import moment from 'moment';

import { FlexedView, H4, withThemeMixin } from '@apollosproject/ui-kit';

import ActionListImage from '../ui/ActionListCard/ActionListImage';
import { Cell, StyledH6 } from '../ui/ActionListCard/ActionListItem';

const EventCard = withThemeMixin(({ theme }) => ({
  colors: { background: { accent: theme.colors.white } },
}))(({ image, start, end, name, location, __typename }) => (
  <Cell>
    <ActionListImage
      source={image && image.sources}
      start={start}
      type={__typename}
    />
    <FlexedView>
      <H4 numberOfLines={2} ellipsizeMode="tail">
        {name}
      </H4>
      <StyledH6 numberOfLines={1}>
        {start &&
          `${moment(start).format('dddd, h:mmA')} — ${moment(end).format(
            'h:mmA'
          )}`}
      </StyledH6>
      <StyledH6 numberOfLines={1}>{location}</StyledH6>
    </FlexedView>
  </Cell>
));

export default EventCard;
