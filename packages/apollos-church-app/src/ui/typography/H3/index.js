import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, setDisplayName, pure } from 'recompose';

import styled from 'apollos-church-app/src/ui/styled';
import { withPlaceholder, Typography } from 'apollos-church-app/src/ui/Placeholder';

const styles = styled(
  ({ theme, padded }) => ({
    fontSize: theme.helpers.rem(1.5),
    lineHeight: theme.helpers.verticalRhythm(1.5, 1.15),
    fontFamily: theme.typography.sans.black.default,
    color: theme.colors.text.primary,
    ...(padded
      ? {
          paddingTop: theme.helpers.verticalRhythm(1.125),
          paddingBottom: theme.helpers.verticalRhythm(0.75),
        }
      : {}),
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
  padded: PropTypes.bool,
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H3;
