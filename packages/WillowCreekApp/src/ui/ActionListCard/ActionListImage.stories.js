import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import { BackgroundView, CenteredView } from '@apollosproject/ui-kit';

import ActionListImage from './ActionListImage';

storiesOf('ui-action-list-card/ActionListImage', module)
  .addDecorator((story) => (
    <BackgroundView>
      <CenteredView>{story()}</CenteredView>
    </BackgroundView>
  ))
  .add('default', () => (
    <ActionListImage
      source="https://picsum.photos/800/1600/?random"
      start="2020-02-18T01:00:00Z"
      type="Event"
    />
  ))
  .add('loading', () => (
    <ActionListImage
      source="https://picsum.photos/800/1600/?random"
      start="2020-02-18T01:00:00Z"
      type="Event"
      isLoading
    />
  ))
  .add('no image', () => (
    <ActionListImage source={null} start="2020-02-18T01:00:00Z" type="Event" />
  ))
  .add('no image loading', () => (
    <ActionListImage
      source={null}
      start="2020-02-18T01:00:00Z"
      type="Event"
      isLoading
    />
  ));
