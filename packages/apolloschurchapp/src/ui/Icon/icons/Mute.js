import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="1.5 -0.5 24 24" {...otherProps}>
    <Path
      d="M10.82 16.73l3.28 2.1a1.5 1.5 0 0 0 2.4-1.2v-5.25M16.5 5.63a1.5 1.5 0 0 0-2.4-1.2l-6.6 4.2h-3a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h.63M3 19.88l18-15"
      fill={'none'}
      stroke={fill}
      strokeWidth={1.5}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
