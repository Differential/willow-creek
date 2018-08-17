import React from 'react';
import { storiesOf } from '@storybook/react-native';

import FlexedView from 'apollos-church-app/src/ui/FlexedView';

import Switch from '.';

storiesOf('Inputs', module).add('Switch', () => (
  <FlexedView>
    <Switch label="Some label text" />
  </FlexedView>
));
