import { Share } from 'react-native';
// import { get } from 'lodash';
import { track, events } from 'apolloschurchapp/src/analytics';
// import getSiteLink from './getSiteLink';

const share = ({ title, message, url, id = '' }) => {
  Share.share({
    title,
    message,
    url,
  });

  track({
    eventName: events.ShareContent,
    properties: { title, id },
  });
};

export default share;
