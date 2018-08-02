import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setDisplayName, pure } from 'recompose';

import styled from '/mobile/ui/styled';
import { withPlaceholder, Typography } from '/mobile/ui/Placeholder';

const styles = styled(
  ({ theme, padded }) => ({
    fontSize: theme.helpers.rem(0.875),
    lineHeight: theme.helpers.verticalRhythm(0.875),
    fontFamily: theme.typography.sans.medium.default,
    color: theme.colors.text.primary,
    ...(padded
      ? {
          paddingTop: theme.helpers.verticalRhythm(0.5775),
          paddingBottom: theme.helpers.verticalRhythm(0.4375),
        }
      : {}),
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
  padded: PropTypes.bool,
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H5;
