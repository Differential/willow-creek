import { compose, setDisplayName } from 'recompose';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  withPlaceholder,
  Paragraph as ParagraphPlaceholder,
} from '../../Placeholder';
import styled from '../../styled';

const Paragraph = compose(
  setDisplayName('Paragraph'),
  styled(({ theme }) => ({
    paddingBottom: theme.helpers.verticalRhythm(0.75),
  })),
  withPlaceholder(ParagraphPlaceholder)
)(View);

Paragraph.propTypes = {
  isLoading: PropTypes.bool, // display loading placeholder
};

export default Paragraph;
