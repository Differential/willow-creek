import React from 'react';
import { storiesOf } from '@storybook/react-native';

import TileImage from './';

storiesOf('TileImage', module)
  .add('Default', () => (
    <TileImage
      image={'https://picsum.photos/600/400/?random'}
      link={'https://github.com'}
      text={'So cool!'}
    />
  ))
  .add('without text', () => (
    <TileImage
      image={'https://picsum.photos/600/400/?random'}
      link={'https://github.com'}
    />
  ));
