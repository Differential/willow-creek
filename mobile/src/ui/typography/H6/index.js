import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setDisplayName, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(0.75),
    lineHeight: theme.helpers.verticalRhythm(0.75),
    fontFamily: theme.typography.sans.bold.default,
    color: theme.colors.text.secondary,
  }),
  'H6'
);

const H6 = compose(
  setDisplayName('H6'),
  styles,
  withPlaceholder(Typography, { width: '50%' }),
  pure
)(Text);

H6.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H6;
