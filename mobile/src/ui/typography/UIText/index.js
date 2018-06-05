import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme, bold, italic }) => ({
    fontSize: theme.helpers.rem(1),
    lineHeight: theme.helpers.verticalRhythm(1, 1),
    fontFamily: theme.typography.ui.normal,
    fontStyle: italic ? 'italic' : null,
    fontWeight: bold ? '700' : null,
    color: theme.colors.text.primary,
  }),
  'UIText'
);

const UIText = compose(
  styles,
  withPlaceholder(Typography, { width: '40%' }),
  pure
)(Text);

UIText.propTypes = {
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default UIText;
