import { StyleSheet } from 'react-native';
import { compose } from 'recompose';

import styled from '../styled';
import ProgressiveImage from '../ProgressiveImage';
import { getIsLoading } from '../isLoading';

const Image = compose(
  getIsLoading,
  styled(
    {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      paddingTop: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    'Card.Image'
  )
)(ProgressiveImage);

Image.propTypes = ProgressiveImage.propTypes;

export default Image;
