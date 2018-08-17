import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setDisplayName, pure } from 'recompose';

import styled from '/mobile/ui/styled';
import { withPlaceholder, Typography } from '/mobile/ui/Placeholder';

const H4 = compose(
  setDisplayName('H4'),
  styled(
    ({ theme, padded }) => ({
      fontSize: theme.helpers.rem(1),
      lineHeight: theme.helpers.verticalRhythm(1),
      fontFamily: theme.typography.sans.bold.default,
      color: theme.colors.text.primary,
      ...(padded
        ? {
            paddingTop: theme.helpers.verticalRhythm(0.66),
            paddingBottom: theme.helpers.verticalRhythm(0.5),
          }
        : {}),
    }),
    'H4'
  ),
  withPlaceholder(Typography, { width: '80%' }),
  pure
)(Text);

H4.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H4;
