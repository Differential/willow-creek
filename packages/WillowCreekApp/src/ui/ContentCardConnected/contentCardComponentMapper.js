import React from 'react';
import { get } from 'lodash';

import {
  DefaultCard,
  HighlightCard,
  FeaturedCard,
} from '@apollosproject/ui-kit';

const contentCardComponentMapper = (props) => {
  // map typename to the the card we want to render.
  if (
    get(props, '__typename') === 'WillowTVContentItem' &&
    get(props, 'liveStream.isLive', false)
  ) {
    return <FeaturedCard {...props} />;
  }
  switch (get(props, '__typename')) {
    case 'WillowTVContentItem':
    case 'MediaContentItem':
    case 'WeekendContentItem':
    case 'ContentSeriesContentItem':
    case 'DevotionalContentItem':
      return <HighlightCard {...props} />;
    default:
      return <DefaultCard {...props} />;
  }
};

export default contentCardComponentMapper;
