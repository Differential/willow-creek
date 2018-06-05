import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(0.875),
    fontFamily: theme.typography.sans.bold.default,
    lineHeight: theme.helpers.verticalRhythm(0.875, 1.014),
    color: theme.colors.text.primary,
  }),
  'H6'
);

const H6 = compose(styles, withPlaceholder(Typography, { width: '50%' }), pure)(
  Text
);

H6.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H6;
