import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setDisplayName, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(0.875),
    lineHeight: theme.helpers.verticalRhythm(0.875),
    fontFamily: theme.typography.sans.medium.default,
    color: theme.colors.text.primary,
  }),
  'H5'
);

const H5 = compose(
  setDisplayName('H5'),
  styles,
  withPlaceholder(Typography, { width: '60%' }),
  pure
)(Text);

H5.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H5;
