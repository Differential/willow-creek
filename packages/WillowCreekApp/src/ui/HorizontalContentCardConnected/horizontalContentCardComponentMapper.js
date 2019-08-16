import React from 'react';
import { get } from 'lodash';

import {
  HorizontalDefaultCard,
  HorizontalHighlightCard,
} from '@apollosproject/ui-kit';

const horizontalContentCardComponentMapper = (props) => {
  // map typename to the the card we want to render.
  switch (get(props, '__typename')) {
    case 'MediaContentItem':
    case 'WeekendContentItem':
    case 'ContentSeriesContentItem':
    case 'DevotionalContentItem':
      return <HorizontalHighlightCard {...props} />;
    default:
      return <HorizontalDefaultCard {...props} />;
  }
};

export default horizontalContentCardComponentMapper;
