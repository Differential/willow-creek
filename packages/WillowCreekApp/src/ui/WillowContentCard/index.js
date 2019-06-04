import React from 'react';
import { ContentCard } from '@apollosproject/ui-kit'
import ImageHeader from '@apollosproject/ui-kit/src/ContentCard/ImageHeader'
import { View } from 'react-native';

const WillowContentCard = (props) => {
  const Header = <ImageHeader {...props} showOverlayColor={true} forceRatio={2} />
  return <ContentCard {...props} header={Header} footer={<View />} />
}

export default WillowContentCard;