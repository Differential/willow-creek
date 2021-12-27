import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { makeIcon } from '@apollosproject/ui-kit';

const Icon = makeIcon(({ size = 24, fill, ...otherProps } = {}) => (
  <Svg width={size} height={size} viewBox="0 0 1024 1024" {...otherProps}>
    <Circle cx="512" cy="512" r="512" fill={fill} />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M686.784 358.293L740.552 488.947L751.02 488.872C763.514 443.348 781.471 399.503 804.5 358.293H686.784Z"
      fill="#FFFFFE"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M383.412 457.085C364.425 407.662 409.567 358.325 409.567 358.325L208 358.495L364.606 738.467H395.616L420.163 675.466C449.831 590.273 447.946 613.552 418.874 543.119L383.412 457.085Z"
      fill="#FFFFFE"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M620.803 457.085C601.805 407.662 646.957 358.325 646.957 358.325L445.39 358.495L601.996 738.467H633.007L657.553 675.466C687.232 590.273 685.347 613.552 656.264 543.119L620.803 457.085Z"
      fill="#FFFFFE"
    />
  </Svg>
));

Icon.propTypes = {
  size: PropTypes.number,
  fill: PropTypes.string,
};

export default Icon;
