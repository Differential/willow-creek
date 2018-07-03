import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setDisplayName, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(1),
    lineHeight: theme.helpers.verticalRhythm(1),
    fontFamily: theme.typography.sans.bold.default,
    color: theme.colors.text.primary,
  }),
  'H4'
);

const H4 = compose(
  setDisplayName('H4'),
  styles,
  withPlaceholder(Typography, { width: '80%' }),
  pure
)(Text);

H4.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H4;
