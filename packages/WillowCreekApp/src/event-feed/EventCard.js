import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import moment from 'moment';
import isNull from 'lodash/isNull';

import {
  FlexedView,
  H3,
  H4,
  H6,
  styled,
  withThemeMixin,
  ConnectedImage,
} from '@apollosproject/ui-kit';

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const Cell = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  paddingVertical: theme.sizing.baseUnit * 1.25,
  backgroundColor: theme.colors.background.paper,
  borderColor: theme.colors.shadows.default,
  borderBottomWidth: 0.5,
  flexDirection: 'row',
  justifyContent: 'flex-start',
}))(View);

const CellImage = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 4,
  height: theme.sizing.baseUnit * 4,
  borderRadius: theme.sizing.baseUnit,
  marginRight: theme.sizing.baseUnit,
}))(ConnectedImage);

const CellView = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 4,
  height: theme.sizing.baseUnit * 4,
  borderRadius: theme.sizing.baseUnit,
  marginRight: theme.sizing.baseUnit,
  backgroundColor: '#F4F4F5',
  alignItems: 'center',
  justifyContent: 'center',
}))(View);

const CellDate = styled(({ theme }) => ({
  color: theme.colors.darkSecondary,
  marginBottom: -theme.sizing.baseUnit / 2,
}))(H3);

const CellMonth = styled(({ theme }) => ({
  color: theme.colors.darkSecondary,
}))(H6);

const Image = ({ source, start, type }) => {
  if (isNull(source) && type === 'Event') {
    const date = moment(start);
    return (
      <CellView>
        <CellDate>{date.format('D')}</CellDate>
        <CellMonth>{date.format('MMM')}</CellMonth>
      </CellView>
    );
  }
  return <CellImage source={source} />;
};

const EventCard = withThemeMixin(({ theme }) => ({
  colors: { background: { accent: theme.colors.white } },
}))(({ image, start, end, name, __typename }) => (
  <Cell>
    <Image source={image && image.sources} start={start} type={__typename} />
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
    </FlexedView>
  </Cell>
));

Image.propTypes = {
  source: PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string,
    })
  ),
  start: PropTypes.string,
  type: PropTypes.string,
};

export default EventCard;
