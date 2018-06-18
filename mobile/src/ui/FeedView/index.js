import React from 'react';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { pure, compose, branch, withProps, defaultProps } from 'recompose';

import styled from 'ui/styled';
import FeedItemCard from 'ui/FeedItemCard';
import { enhancer as mediaQuery } from 'ui/MediaQuery';
import { ErrorCard } from 'ui/Card';

const StyledFlatList = styled(({ theme }) => ({
  paddingVertical: theme.sizing.baseUnit / 4,
}))(FlatList);

export class FeedView extends React.Component {
  static propTypes = {
    content: PropTypes.array, // eslint-disable-line
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    fetchMore: PropTypes.func,
    isLoading: PropTypes.bool,
    keyExtractor: PropTypes.func,
    ListEmptyComponent: PropTypes.func,
    numColumns: PropTypes.number,
    onEndReachedThreshold: PropTypes.number,
    onPressItem: PropTypes.func,
    refetch: PropTypes.func,
    renderEmptyState: PropTypes.func,
    renderItem: PropTypes.func,
  };

  static defaultProps = {
    isLoading: false,
    // renderItem: this.defaultFeedItemRenderer,
    onEndReachedThreshold: 0.7,
    keyExtractor: (item) => item && item.node.id,
    content: [],
    refetch: undefined,
    fetchMore: undefined,
  };

  refetchHandler = ({ isLoading, refetch }) =>
    refetch && ((...args) => !isLoading && refetch(...args));

  fetchMoreHandler = ({ fetchMore, error, isLoading }) =>
    fetchMore && ((...args) => !isLoading && !error && fetchMore(...args));

  renderItem = ({ item }) => {
    if (this.props.renderItem) {
      return this.props.renderItem({ item });
    }
    return (
      // These are all props of FeedItemCard but they do not have data coming
      // back yet. So I moved them here for safe keeping.
      // TODO: Move them back when the data is ready.
      // backgroundColor={item.theme.colors.background.paper}
      // isLight={item.theme.isLight}
      // isLiked={item.isLiked}
      <TouchableWithoutFeedback
        onPress={() => this.props.onPressItem({ ...item })}
      >
        <FeedItemCard
          id={item.node.id}
          title={item.node.title || item.node.name || ' '}
          channelType={item.node.parentChannel.name}
          channelTypeIcon={item.node.parentChannel.iconName}
          images={item.node.coverImage.sources}
          isLoading={item.node.isLoading}
        />
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {
      content,
      error,
      fetchMore,
      isLoading,
      keyExtractor,
      ListEmptyComponent,
      numColumns,
      onEndReachedThreshold,
      refetch,
      renderEmptyState,
      renderItem,
      ...otherProps
    } = this.props;

    return (
      <StyledFlatList
        {...otherProps}
        data={content}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          error && !isLoading && (!content || !content.length) ? (
            <ErrorCard error={error} />
          ) : (
            ListEmptyComponent
          )
        }
        numColumns={numColumns}
        onEndReached={this.fetchMoreHandler({ fetchMore, error, isLoading })}
        onEndReachedThreshold={onEndReachedThreshold}
        onRefresh={this.refetchHandler({ isLoading, refetch })}
        refreshing={isLoading}
        renderItem={this.renderItem}
      />
    );
  }
}

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
      fetchMore: () => {},
    })
  ),
  mediaQuery(
    ({ md }) => ({ maxWidth: md }),
    defaultProps({ numColumns: 1 }),
    defaultProps({ numColumns: 2 })
  )
);

export default enhance(FeedView);
