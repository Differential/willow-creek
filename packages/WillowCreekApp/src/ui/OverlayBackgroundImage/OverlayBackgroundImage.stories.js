import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import OverlayBackgroundImage from '.';

storiesOf('OverlayBackgroundImage', module).add('default', () => (
  <OverlayBackgroundImage source={{ uri: 'https://picsum.photos/600/600' }} />
));
