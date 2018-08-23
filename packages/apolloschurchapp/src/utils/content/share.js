import { Share } from 'react-native';
// import { get } from 'lodash';
// import { track, events } from '@utils/analytics';
// import getSiteLink from './getSiteLink';

const share = ({ title, message, url }) => {
  Share.share({
    title,
    message,
    url,
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
