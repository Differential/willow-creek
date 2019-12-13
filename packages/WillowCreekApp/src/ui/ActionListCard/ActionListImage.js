import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import moment from 'moment';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

import {
  H3,
  H6,
  styled,
  ConnectedImage,
  ImageSourceType,
} from '@apollosproject/ui-kit';

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

const hasNoImage = (source) => isNull(source) || source === '';

const Image = ({ source, start, type }) => {
  if (hasNoImage(source) && type === 'Event') {
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

Image.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.arrayOf(ImageSourceType),
    ImageSourceType,
  ]),
  start: PropTypes.string,
  type: PropTypes.string,
};

export default Image;
