import React from 'react';
import { get } from 'lodash';

import {
  DefaultCard,
  HighlightCard,
  FeaturedCard,
} from '@apollosproject/ui-kit';

const contentCardComponentMapper = (props) => {
  // map typename to the the card we want to render.

  const hasMedia =
    !!get(props, 'videos.[0].sources[0]', null) ||
    !!get(props, 'videos.[0].youtubeId', null);

  if (
    get(props, '__typename') === 'WillowTVContentItem' &&
    get(props, 'liveStream.isLive', false)
  ) {
    return <FeaturedCard {...props} hasAction={hasMedia} />;
  }
  switch (get(props, '__typename')) {
    case 'WillowTVContentItem':
    case 'MediaContentItem':
    case 'WeekendContentItem':
    case 'ContentSeriesContentItem':
    case 'DevotionalContentItem':
      return <HighlightCard {...props} hasAction={hasMedia} />;
    default:
      return <DefaultCard {...props} hasAction={hasMedia} />;
  }
};

export default contentCardComponentMapper;
