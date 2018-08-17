import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setDisplayName, pure } from 'recompose';

import styled from 'apolloschurchapp/src/ui/styled';
import {
  withPlaceholder,
  Typography,
} from 'apolloschurchapp/src/ui/Placeholder';

const styles = styled(
  ({ theme, padded }) => ({
    fontSize: theme.helpers.rem(0.75),
    lineHeight: theme.helpers.verticalRhythm(0.75),
    fontFamily: theme.typography.sans.bold.default,
    color: theme.colors.text.secondary,
    ...(padded
      ? {
          // paddingTop: theme.helpers.verticalRhythm(0.495),
          paddingBottom: theme.helpers.verticalRhythm(0.375),
        }
      : {}),
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
  padded: PropTypes.bool,
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H6;
