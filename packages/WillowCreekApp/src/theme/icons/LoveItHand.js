import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size = 64, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" {...otherProps}>
    <G
      stroke="none"
      fill="none"
      fillRule="evendodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0}
      transform="matrix(1,0,0,1,0,0)"
    >
      <Path
        d="M23.127,2.45c-0.87-1.741-2.986-2.447-4.727-1.577c-0.339,0.17-0.649,0.393-0.918,0.661l-0.3,0.3 c-0.098,0.097-0.256,0.097-0.354,0l-0.305-0.305c-1.375-1.379-3.607-1.382-4.986-0.008s-1.382,3.607-0.007,4.985l4.768,4.974 c0.371,0.39,0.988,0.406,1.378,0.035c0.012-0.011,0.023-0.023,0.035-0.035l0,0l4.76-4.966C23.541,5.442,23.806,3.805,23.127,2.45z M1.5,14.25c-0.552,0-1,0.448-1,1v7.25c0,0.552,0.448,1,1,1s1-0.448,1-1v-7.25C2.5,14.698,2.052,14.25,1.5,14.25z M16,19H6.875 C6.53,19,6.25,18.72,6.25,18.375s0.28-0.625,0.625-0.625H9.4c0.552,0,1-0.448,0.999-1.001c0-0.135-0.027-0.268-0.08-0.392 C9.967,15.534,9.159,15,8.264,15H4c-0.276,0-0.5,0.224-0.5,0.5V22c0,0.276,0.224,0.5,0.5,0.5h10.764 c1.234-0.002,2.234-1.002,2.236-2.236V20C17,19.448,16.552,19,16,19z"
        fill={fill}
      />
    </G>
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
