import React from 'react';
import PropTypes from 'prop-types';
import { Touchable } from '@apollosproject/ui-kit';
import ProtectedAction from './ProtectedAction';

const ProtectedTouchable = ({
  onPress,
  children,
  TouchableComponent = Touchable,
}) => (
  <ProtectedAction action={onPress}>
    {(action) => (
      <TouchableComponent onPress={action}>{children}</TouchableComponent>
    )}
  </ProtectedAction>
);

ProtectedTouchable.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  TouchableComponent: PropTypes.func,
};

export default ProtectedTouchable;
