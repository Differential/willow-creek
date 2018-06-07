import React from 'react';
import { View } from 'react-native';
import { compose } from 'recompose';
import Placeholder from 'rn-placeholder';

import styled from 'ui/styled';

const enhance = compose(Placeholder.connect);

const StyledView = styled(({ theme }) => ({
  width: '100%',
  aspectRatio: 1,
  backgroundColor: theme.colors.background.inactive,
}))(View);

const SkeletonImage = enhance(() => <StyledView />);

export default SkeletonImage;
