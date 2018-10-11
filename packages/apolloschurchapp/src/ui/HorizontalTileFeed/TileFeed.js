import { FlatList } from 'react-native';

import styled from 'apolloschurchapp/src/ui/styled';

const TileFeed = styled(({ theme, tileHeight }) => ({
  height: tileHeight,
  paddingBottom: theme.sizing.baseUnit / 2,
}))(FlatList);

export default TileFeed;
