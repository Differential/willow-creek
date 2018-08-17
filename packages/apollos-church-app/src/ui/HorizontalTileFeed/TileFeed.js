import { FlatList } from 'react-native';

import styled from 'apollos-church-app/src/ui/styled';

const TileFeed = styled(({ theme, tileHeight }) => ({
  height: tileHeight,
  paddingHorizontal: theme.sizing.baseUnit / 2,
  paddingBottom: theme.sizing.baseUnit / 2,
}))(FlatList);

export default TileFeed;
