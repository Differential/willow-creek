import { Share } from 'react-native';
// import { get } from 'lodash';
// import { track, events } from '@utils/analytics';
// import getSiteLink from './getSiteLink';

const share = (content) => {
  Share.share({
    title: content.title || content.name,
    message: content.message || content.name,
    // url: getSiteLink(content),
    url: content.url,
  });

  // track(events.Shared, {
  //   channel: get(content, 'channelName'),
  //   isLiked: get(content, 'content.isLiked'),
  //   contentId: get(content, 'id'),
  //   meta: get(content, 'meta'),
  //   title: content.title || content.name,
  // });
};

export default share;
