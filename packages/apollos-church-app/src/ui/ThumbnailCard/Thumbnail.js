import { StyleSheet } from 'react-native';
import { compose } from 'recompose';

import styled from 'apollos-church-app/src/ui/styled';
import ProgressiveImage from 'apollos-church-app/src/ui/ProgressiveImage';
import { getIsLoading } from 'apollos-church-app/src/ui/isLoading';

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
