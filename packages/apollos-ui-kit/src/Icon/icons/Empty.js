import React from 'react';
import PropTypes from 'prop-types';
import Svg from 'react-native-svg';

import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps} />
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
