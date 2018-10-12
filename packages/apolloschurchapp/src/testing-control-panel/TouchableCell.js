import React from 'react';
import PropType from 'prop-types';
import Touchable from 'apolloschurchapp/src/ui/Touchable';

import { Cell, CellIcon, CellText } from 'apolloschurchapp/src/ui/TableView';

const TouchableCell = ({ iconName, cellText, handlePress }) => (
  <Touchable onPress={handlePress}>
    <Cell>
      <CellIcon name={iconName} />
      <CellText>{cellText}</CellText>
    </Cell>
  </Touchable>
);

TouchableCell.propTypes = {
  iconName: PropType.string.isRequired,
  cellText: PropType.string.isRequired,
  handlePress: PropType.func.isRequired,
};

export default TouchableCell;
