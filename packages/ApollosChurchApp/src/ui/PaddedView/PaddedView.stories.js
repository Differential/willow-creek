import React from 'react';
import { storiesOf } from '@storybook/react-native';

import { H1 } from '/mobile/ui/typography';

import PaddedView from '.';

storiesOf('PaddedView', module).add('Example', () => (
  <PaddedView>
    <H1>This text is in a PaddedView</H1>
  </PaddedView>
));
