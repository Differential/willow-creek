import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import PropTypes from 'prop-types';

const Icon = ({ tintColor }) => (
  <Svg width={22} height={22} viewBox="0 0 22 24">
    <G
      stroke={tintColor}
      fill="none"
      fillRule="evendodd"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M20.251,7.585 C18.0542067,7.59347055 15.9507551,8.47427536 14.4033889,10.0336439 C12.8560227,11.5930125 11.9914967,13.7032069 12,15.9 C14.1967933,15.8915294 16.3002449,15.0107246 17.8476111,13.4513561 C19.3949773,11.8919875 20.2595033,9.78179315 20.251,7.585 Z" />
      <Path d="M14.171,10.279 C15.3266999,6.9509516 14.4888972,3.25531102 12.011,0.751 C9.52318062,3.26537508 8.68947896,6.97956064 9.864,10.316" />
      <Path d="M3.751,7.585 C8.32480655,7.6037404 12.0177087,11.3261893 12,15.9 C7.42619345,15.8812596 3.73329131,12.1588107 3.751,7.585 Z" />
      <Path d="M12.001,19.501 L12.001,15.9" />
      <Path d="M0.751,23.25 C7.41811092,18.2513329 16.5838891,18.2513329 23.251,23.25" />
    </G>
  </Svg>
);
Icon.propTypes = {
  tintColor: PropTypes.string,
};

export default Icon;
