import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(0.778),
    lineHeight: theme.helpers.verticalRhythm(0.778, 1.014),
    fontFamily: theme.typography.sans.regular.default,
    color: theme.colors.text.primary,
  }),
  'H7'
);

const H7 = compose(styles, withPlaceholder(Typography, { width: '40%' }), pure)(
  Text
);

H7.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H7;
