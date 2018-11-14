import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

import makeIcon from './makeIcon';

const Icon = makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <Path
      d="M3.8182 5.7778v12.4444H14.2V5.7778H3.8182zM16 6v12c0 1.1046-.8954 2-2 2H4c-1.1046 0-2-.8954-2-2V6c0-1.1046.8954-2 2-2h10c1.1046 0 2 .8954 2 2zm4.1818 2.6952L16 11.8084v.3832l4.1818 3.251V8.695zM16 14.4957V9.4253l6-4.2178v13.585l-6-4.2968z"
      fill={fill}
    />
    <Path
      d="M0.219669914,1.28033009 C-0.0732233047,0.987436867 -0.0732233047,0.512563133 0.219669914,0.219669914 C0.512563133,-0.0732233047 0.987436867,-0.0732233047 1.28033009,0.219669914 L23.7803301,22.7196699 C24.0732233,23.0125631 24.0732233,23.4874369 23.7803301,23.7803301 C23.4874369,24.0732233 23.0125631,24.0732233 22.7196699,23.7803301 L0.219669914,1.28033009 Z"
      transform="translate(12.000000, 12.000000) scale(-1, 1) translate(-12.000000, -12.000000) "
      fill={fill}
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
