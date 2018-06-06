import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Path d="M7 10l5 5 5-5z" fill={fill} />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
