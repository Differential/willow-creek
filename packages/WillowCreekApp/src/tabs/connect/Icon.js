import React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';
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
      <Circle cx="10" cy="6" r="5.25" />
      <Path d="M0.25,23.25 C0.25,17.8652237 4.61522369,13.5 10,13.5 C15.3847763,13.5 19.75,17.8652237 19.75,23.25" />
    </G>
  </Svg>
);

Icon.propTypes = {
  tintColor: PropTypes.string,
};

export default Icon;
