import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setDisplayName, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(1.5),
    lineHeight: theme.helpers.verticalRhythm(1.5, 1.15),
    fontFamily: theme.typography.sans.black.default,
    color: theme.colors.text.primary,
  }),
  'H3'
);

const H3 = compose(
  setDisplayName('H3'),
  styles,
  withPlaceholder(Typography, { width: '100%' }),
  pure
)(Text);

H3.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H3;
