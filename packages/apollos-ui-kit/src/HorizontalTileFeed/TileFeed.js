import { FlatList } from 'react-native';

import styled from '../styled';

const TileFeed = styled(({ theme, tileHeight }) => ({
  height: tileHeight,
  paddingBottom: theme.sizing.baseUnit / 2,
}))(FlatList);

export default TileFeed;
