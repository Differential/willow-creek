import getAllLikedContent from 'WillowCreekApp/src/tabs/connect/getLikedContent';
import { contentItemFragment } from 'WillowCreekApp/src/content-single/getContentItem';

const addItemToLikedContentList = ({ cache, item }) => {
  try {
    const data = cache.readQuery({ query: getAllLikedContent });
    const fullItem = cache.readFragment({
      id: `${item.__typename}:${item.id}`,
      fragment: contentItemFragment,
    });
    cache.writeQuery({
      query: getAllLikedContent,
      data: {
        ...data,
        getAllLikedContent: [fullItem, ...data.getAllLikedContent],
      },
    });
  } catch (e) {
    console.log(e);
    // Most likely we haven't ran the `getAllLikedContent` query yet.
    // We can safely exit.
  }
};

const removeItemFromLikedContentList = ({ cache, item }) => {
  try {
    const data = cache.readQuery({ query: getAllLikedContent });
    cache.writeQuery({
      query: getAllLikedContent,
      data: {
        ...data,
        getAllLikedContent: data.getAllLikedContent.filter(
          (content) => content.id !== item.id
        ),
      },
    });
  } catch (e) {
    console.log(e);
    // Most likely we haven't ran the `getAllLikedContent` query yet.
    // We can safely exit.
  }
};

const updateLikedContent = ({ liked, cache, item }) => {
  if (liked) {
    addItemToLikedContentList({ cache, item });
  } else {
    removeItemFromLikedContentList({ cache, item });
  }
};

export default updateLikedContent;
