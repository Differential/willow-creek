import { View } from 'react-native';

import styled from 'apollos-church-app/src/ui/styled';

const AvatarList = styled(
  {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  'Avatar.List'
)(View);

export default AvatarList;
