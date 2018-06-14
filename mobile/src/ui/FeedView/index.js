import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { pure, compose, branch, withProps, defaultProps } from 'recompose';

import styled from 'ui/styled';
import FeedItemCard from 'ui/FeedItemCard';
import { enhancer as mediaQuery } from 'ui/MediaQuery';
import { ErrorCard } from 'ui/Card';

const StyledFlatList = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
}))(FlatList);

// eslint-disable-next-line
const defaultFeedItemRenderer = ({ item }) => {
  if (!item) return null;
  return (
    // <Link to={item.link} component={TouchableWithoutFeedback}>

    // These are all props of FeedItemCard but they do not have data coming
    // back yet. So I moved them here for safe keeping. TODO: Move them back
    // when the data is ready.
    // backgroundColor={item.theme.colors.background.paper}
    // isLight={item.theme.isLight}
    // isLiked={item.isLiked}
    <FeedItemCard
      id={item.node.id}
      title={item.node.title || item.node.name || ' '}
      channelType={item.node.parentChannel.name}
      channelTypeIcon={item.node.parentChannel.iconName}
      images={item.node.coverImage.sources}
      isLoading={item.node.isLoading}
    />
    // </Link>
  );
};

const generateLoadingStateData = (numberOfItems = 1) => {
  const itemData = () => ({
    node: {
      id: 'fakeId0',
      isLoading: true,
      title: '',
      channelType: '',
      coverImage: [],
      theme: {
        isLight: '',
        colors: {
          background: {
            paper: '',
          },
        },
      },
      parentChannel: {
        id: '',
        name: '',
      },
    },
  });

  const loadingStateData = [itemData()];

  while (loadingStateData.length < numberOfItems) {
    const newData = itemData();
    newData.node.id = `fakeId${loadingStateData.length}`;
    loadingStateData.push(newData);
  }

  return loadingStateData;
};

const enhance = compose(
  pure,
  branch(
    ({ isLoading, content }) => isLoading && !content.length,
    withProps({
      isLoading: true,
      content: generateLoadingStateData(10),
      fetchMore: false,
    })
  ),
  mediaQuery(
    ({ md }) => ({ maxWidth: md }),
    defaultProps({ numColumns: 1 }),
    defaultProps({ numColumns: 2 })
  )
);

const refetchHandler = ({ isLoading, refetch }) =>
  refetch && ((...args) => !isLoading && refetch(...args));

const fetchMoreHandler = ({ fetchMore, error, isLoading }) =>
  fetchMore && ((...args) => !isLoading && !error && fetchMore(...args));

const FeedView = enhance(
  ({
    isLoading,
    refetch,
    content,
    error,
    fetchMore,
    numColumns,
    renderItem,
    ListEmptyComponent,
    ...otherProps
  }) => (
    <StyledFlatList
      {...otherProps}
      renderItem={renderItem}
      refreshing={isLoading}
      onRefresh={refetchHandler({ isLoading, refetch })}
      onEndReached={fetchMoreHandler({ fetchMore, error, isLoading })}
      numColumns={numColumns}
      data={content}
      ListEmptyComponent={
        error && !isLoading && (!content || !content.length) ? (
          <ErrorCard error={error} />
        ) : (
          ListEmptyComponent
        )
      }
    />
  )
);

FeedView.defaultProps = {
  isLoading: false,
  renderItem: defaultFeedItemRenderer,
  onEndReachedThreshold: 0.7,
  keyExtractor: (item) => item && item.node.id,
  content: [],
  refetch: undefined,
  fetchMore: undefined,
};

FeedView.propTypes = {
  isLoading: PropTypes.bool,
  content: PropTypes.array, // eslint-disable-line
  refetch: PropTypes.func,
  fetchMore: PropTypes.func,
  renderItem: PropTypes.func,
  renderEmptyState: PropTypes.func,
  numColumns: PropTypes.number,
};

export { FeedView as default, defaultFeedItemRenderer };
