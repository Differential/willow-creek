import { View } from 'react-native';

import styled from '../styled';

const AvatarList = styled(
  {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  'Avatar.List'
)(View);

export default AvatarList;
