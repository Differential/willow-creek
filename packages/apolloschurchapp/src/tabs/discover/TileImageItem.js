import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import TileImage from 'apolloschurchapp/src/ui/TileImage';
import styled from 'apolloschurchapp/src/ui/styled';

const Container = styled(({ theme }) => ({
  flex: 1,
  padding: theme.sizing.baseUnit / 2,
}))(View);

const TileImageItem = ({
  item: { id, title, coverImage = {}, sharing } = {},
  isLoading,
  navigation,
}) => (
  <Container>
    <TileImage
      onPressItem={() =>
        navigation.navigate('ContentSingle', {
          itemId: id,
          sharing,
        })
      }
      isLoading={isLoading}
      key={id}
      text={title}
      image={coverImage && coverImage.sources}
    />
  </Container>
);

TileImageItem.propTypes = {
  item: PropTypes.shape({}),
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  isLoading: PropTypes.bool,
};

export default TileImageItem;
