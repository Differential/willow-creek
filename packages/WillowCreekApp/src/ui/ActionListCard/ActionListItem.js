import React from 'react';
import { View } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  H6,
  H3,
  H4,
  styled,
  TouchableScale,
  ConnectedImage,
  // ImageSourceType,
  FlexedView,
} from '@apollosproject/ui-kit';

const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const TextContainer = styled(({ theme }) => ({
  justifyContent: 'center',
  marginTop: theme.sizing.baseUnit / 2.5,
  borderBottomWidth: 0.5,
  height: theme.sizing.baseUnit * 4.25,
  borderColor: theme.colors.shadows.default,
}))(FlexedView);

const Cell = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  paddingVertical: theme.sizing.baseUnit / 4,
  backgroundColor: theme.colors.background.paper,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
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

const Image = ({ relatedNode, source }) => {
  if (source === '' && get(relatedNode, '__typename') === 'Event') {
    const date = moment(get(relatedNode, 'start'));
    return (
      <CellView>
        <CellDate>{date.format('D')}</CellDate>
        <CellMonth>{date.format('MMM')}</CellMonth>
      </CellView>
    );
  }
  return <CellImage source={source} />;
};

const ActionListItem = ({
  imageSource,
  title,
  action,
  relatedNode,
  label,
  onPressActionItem,
}) => (
  <TouchableScale onPress={() => onPressActionItem({ action, relatedNode })}>
    <Cell>
      <Image source={imageSource} relatedNode={relatedNode} />
      <TextContainer>
        {label ? <StyledH6 numberOfLines={1}>{label}</StyledH6> : null}
        <H4 numberOfLines={2} ellipsizeMode="tail">
          {title}
        </H4>
      </TextContainer>
    </Cell>
  </TouchableScale>
);

ActionListItem.propTypes = {
  // imageSource: ImageSourceType.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.string,
  relatedNode: PropTypes.any, // eslint-disable-line
  label: PropTypes.string,
  onPressActionItem: PropTypes.func,
};

export default ActionListItem;
