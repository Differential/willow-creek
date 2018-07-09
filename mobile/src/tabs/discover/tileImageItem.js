import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import TileImage from 'ui/TileImage';
import styled from 'ui/styled';

const Container = styled(({ theme }) => ({
  flex: 1,
  padding: theme.sizing.baseUnit / 2,
}))(View);

const TileImageItem = ({
  item: { id, title, coverImage = {} } = {},
  isLoading,
  navigation,
}) => (
  <Container>
    <TileImage
      onPressItem={() =>
        navigation.navigate('ContentSingle', {
          itemId: id,
          itemTitle: title,
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
