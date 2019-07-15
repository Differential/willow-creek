import React from 'react';
import { MediaPlayer } from '@apollosproject/ui-media-player';
import YoutubeVideoWindow from './YoutubeVideoWindow';

// export default MediaPlayer;

const MediaPlayerYoutube = (props) => (
  <MediaPlayer VideoWindowComponent={YoutubeVideoWindow} {...props} />
);

export default MediaPlayerYoutube;
