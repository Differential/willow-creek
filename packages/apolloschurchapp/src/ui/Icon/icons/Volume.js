import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path, G } from 'react-native-svg';

import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <G
      fill={'none'}
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    >
      <Path d="M14.17 4.66a1.5 1.5 0 0 0-1.57.14L6 9H3a1.5 1.5 0 0 0-1.5 1.5v3A1.5 1.5 0 0 0 3 15h3l6.6 4.2A1.5 1.5 0 0 0 15 18V6a1.5 1.5 0 0 0-.83-1.34z" />
      <Path d="M21.46 15.75a6.6 6.6 0 0 0 0-7.1" />
      <Path d="M18.56 14.44a3.5 3.5 0 0 0 0-4.4" />
      <Path d="M6 9v6" />
    </G>
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
