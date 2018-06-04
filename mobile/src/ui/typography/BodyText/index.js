import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(({ theme, bold, italic }) => {
  let fontStack = theme.typography.serif.regular.default;

  if (bold && italic) {
    fontStack = theme.typography.serif.bold.italic;
  } else if (bold) {
    fontStack = theme.typography.serif.bold.default;
  } else if (italic) {
    fontStack = theme.typography.serif.regular.italic;
  }

  return {
    fontSize: theme.helpers.rem(1.112),
    lineHeight: theme.helpers.verticalRhythm(1.112, 1.4889),
    fontFamily: fontStack,
    color: theme.colors.text.primary,
  };
}, 'BodyText');

const BodyText = compose(styles, withPlaceholder(Typography), pure)(Text);

BodyText.propTypes = {
  bold: PropTypes.bool,
  italic: PropTypes.bool,
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

BodyText.defaultProps = {
  bold: false,
  italic: false,
};

export default BodyText;
