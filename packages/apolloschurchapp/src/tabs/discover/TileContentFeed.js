import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import { H4 } from 'apolloschurchapp/src/ui/typography';
import HorizontalTileFeed from 'apolloschurchapp/src/ui/HorizontalTileFeed';
import styled from 'apolloschurchapp/src/ui/styled';
import { ButtonLink } from 'apolloschurchapp/src/ui/Button';

import TileImageItem from './TileImageItem';

const RowHeader = styled({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 0,
})(PaddedView);

const TileContentFeed = ({ isLoading, id, name, navigation, content = [] }) => (
  <PaddedView horizontal={false}>
    <RowHeader>
      <H4 isLoading={isLoading}>{name}</H4>
      {!isLoading ? (
        <ButtonLink
          onPress={() => {
            navigation.navigate('ContentFeed', {
              itemId: id,
              itemTitle: name,
            });
          }}
        >
          View All
        </ButtonLink>
      ) : null}
    </RowHeader>
    <HorizontalTileFeed
      content={content}
      renderItem={({ item }) => (
        <TileImageItem
          item={item}
          isLoading={isLoading}
          navigation={navigation}
        />
      )}
      loadingStateObject={{
        id: 'fake_id',
        title: '',
        coverImage: [],
      }}
      isLoading={isLoading}
    />
  </PaddedView>
);

TileContentFeed.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
  isLoading: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.any // this component doesn't care about the shape of `node`, just that it exists
  ),
};

export default withNavigation(TileContentFeed);
