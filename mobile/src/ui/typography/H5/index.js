import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';

import styled from 'ui/styled';
import { withPlaceholder, Typography } from 'ui/Placeholder';

const styles = styled(
  ({ theme }) => ({
    fontSize: theme.helpers.rem(1.112),
    lineHeight: theme.helpers.verticalRhythm(1.112, 1.13889),
    fontFamily: theme.typography.sans.bold.default,
    color: theme.colors.text.primary,
  }),
  'H5'
);

const H5 = compose(styles, withPlaceholder(Typography, { width: '60%' }), pure)(
  Text
);

H5.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
  ...Text.propTypes,
};

export default H5;
