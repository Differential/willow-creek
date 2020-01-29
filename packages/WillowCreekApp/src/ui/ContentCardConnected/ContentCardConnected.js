import React from 'react';
import { ContentCardConnected } from '@apollosproject/ui-connected';
import contentCardComponentMapper from './contentCardComponentMapper';

const ContentCardConnectedWithCustomMapper = (props) => (
  <ContentCardConnected {...props} Component={contentCardComponentMapper} />
);

export default ContentCardConnectedWithCustomMapper;
