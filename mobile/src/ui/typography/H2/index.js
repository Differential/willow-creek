import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(2.35),
    lineHeight: theme.helpers.verticalRhythm(2.35, 1.14),
    fontFamily: theme.typography.sans.bold.default,
    color: theme.colors.text.primary,
  }),
  'H2'
);

const H2 = compose(
  styles,
  withPlaceholder(Typography, { width: '100%' }),
  pure
)(Text);

H2.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H2;
