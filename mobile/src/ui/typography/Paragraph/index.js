import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  withPlaceholder,
  Paragraph as ParagraphPlaceholder,
} from 'ui/Placeholder';
import styled from 'ui/styled';

const Paragraph = compose(
  styled(({ theme }) => ({
    paddingVertical: theme.helpers.verticalRhythm(0.5, 1),
  })),
  withPlaceholder(ParagraphPlaceholder)
)(View);

Paragraph.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
};

export default Paragraph;
