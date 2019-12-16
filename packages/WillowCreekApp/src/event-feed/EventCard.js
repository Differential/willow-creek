import React from 'react';
import moment from 'moment';
import { View } from 'react-native';

import { styled, FlexedView, H4, withThemeMixin } from '@apollosproject/ui-kit';

import ActionListImage from '../ui/ActionListCard/ActionListImage';
import { StyledH6 } from '../ui/ActionListCard/ActionListItem';

const Cell = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  paddingVertical: theme.sizing.baseUnit * 1.25,
  backgroundColor: theme.colors.background.paper,
  borderColor: theme.colors.shadows.default,
  borderBottomWidth: 0.5,
  flexDirection: 'row',
  justifyContent: 'flex-start',
}))(View);

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
