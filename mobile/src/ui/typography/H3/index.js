import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(1.8),
    lineHeight: theme.helpers.verticalRhythm(1.8, 1.14),
    fontFamily: theme.typography.sans.bold.default,
    color: theme.colors.text.primary,
  }),
  'H3'
);

const H3 = compose(
  styles,
  withPlaceholder(Typography, { width: '100%' }),
  pure
)(Text);

H3.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H3;
