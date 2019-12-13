import React from 'react';
import { View } from 'react-native';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import {
  H6,
  H4,
  styled,
  TouchableScale,
  ImageSourceType,
  FlexedView,
} from '@apollosproject/ui-kit';

import ActionListImage from './ActionListImage';

export const StyledH6 = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const TextContainer = styled(({ theme }) => ({
  justifyContent: 'center',
  marginTop: theme.sizing.baseUnit / 2.5,
  borderBottomWidth: 0.5,
  height: theme.sizing.baseUnit * 4.25,
  borderColor: theme.colors.shadows.default,
}))(FlexedView);

export const Cell = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  paddingVertical: theme.sizing.baseUnit / 4,
  backgroundColor: theme.colors.background.paper,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
}))(View);

const ActionListItem = ({
  imageSource,
  title,
  action,
  relatedNode,
  label,
  onPressActionItem,
}) => {
  const type = get(relatedNode, '__typename');
  const start = get(relatedNode, 'start');

  return (
    <TouchableScale onPress={() => onPressActionItem({ action, relatedNode })}>
      <Cell>
        <ActionListImage source={imageSource} type={type} start={start} />
        <TextContainer>
          {label ? <StyledH6 numberOfLines={1}>{label}</StyledH6> : null}
          <H4 numberOfLines={2} ellipsizeMode="tail">
            {title}
          </H4>
        </TextContainer>
      </Cell>
    </TouchableScale>
  );
};

ActionListItem.propTypes = {
  imageSource: PropTypes.oneOfType([
    PropTypes.arrayOf(ImageSourceType),
    ImageSourceType,
  ]),
  title: PropTypes.string.isRequired,
  action: PropTypes.string,
  relatedNode: PropTypes.any, // eslint-disable-line
  label: PropTypes.string,
  onPressActionItem: PropTypes.func,
};

export default ActionListItem;
