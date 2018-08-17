import React from 'react';
import PropTypes from 'prop-types';

import { H4 } from 'apolloschurchapp/src/ui/typography';

const Label = ({ route }) => {
  const labelText = route.title;
  return <H4 padded>{labelText}</H4>;
};

Label.propTypes = { route: PropTypes.shape({ title: PropTypes.string }) };

export default Label;
