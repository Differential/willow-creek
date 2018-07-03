import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setDisplayName, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(2.25),
    lineHeight: theme.helpers.verticalRhythm(2.25, 1.15),
    fontFamily: theme.typography.sans.black.default,
    color: theme.colors.text.primary,
  }),
  'H2'
);

const H2 = compose(
  setDisplayName('H2'),
  styles,
  withPlaceholder(Typography, { width: '100%' }),
  pure
)(Text);

H2.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H2;
