import { Platform } from 'react-native';
import { compose } from 'recompose';

import styled from '../styled';
import ProgressiveImage from '../ProgressiveImage';
import { getIsLoading } from '../isLoading';

const Image = compose(
  getIsLoading,
  styled(
    ({ theme }) => ({
      aspectRatio: 1,
      width: '100%',
      ...Platform.select({
        android: {
          // fixes android borderRadius overflow display issue
          borderTopRightRadius: theme.sizing.baseUnit,
          borderTopLeftRadius: theme.sizing.baseUnit,
        },
      }),
    }),
    'Card.Image'
  )
)(ProgressiveImage);

Image.propTypes = ProgressiveImage.propTypes;

export default Image;
