import { View } from 'react-native';

import styled from '/mobile/ui/styled';

const ChipList = styled(
  {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  'Chip.List'
)(View);

export default ChipList;
