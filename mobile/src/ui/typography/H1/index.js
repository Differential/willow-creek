import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setDisplayName, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(2.6875),
    lineHeight: theme.helpers.verticalRhythm(2.6875, 1.15),
    fontFamily: theme.typography.sans.black.default,
    color: theme.colors.text.primary,
  }),
  'H1'
);

const H1 = compose(
  setDisplayName('H1'),
  styles,
  withPlaceholder(Typography, { width: '100%' }),
  pure
)(Text);

H1.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H1;
