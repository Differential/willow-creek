import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View } from 'react-native';

import {
  styled,
  FlexedView,
  H4,
  withThemeMixin,
  withIsLoading,
  ImageSourceType,
} from '@apollosproject/ui-kit';

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

const EventCard = ({ image, start, end, name, location, __typename }) => (
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
);

EventCard.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.arrayOf(ImageSourceType),
    ImageSourceType,
  ]),
  start: PropTypes.string,
  end: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  __typename: PropTypes.string,
  /* This prop type is listed because it is needed. However, the prop is passed into context
   * automatically by `withIsLoading` so the prop variable is never used. */
  isLoading: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
};

EventCard.displayName = 'EventCard';

const EventCardWithTheme = withThemeMixin(({ theme }) => ({
  colors: { background: { accent: theme.colors.white } },
}))(EventCard);

export default withIsLoading(EventCardWithTheme);
