import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import BackgroundImage from '../CityBackgroundImage';
import AskNotifications from './AskNotifications';
import Onboarding from '.';

storiesOf('Onboarding', module)
  .add('full', () => <Onboarding />)
  .add('AskNotifications', () => (
    <AskNotifications
      onPressPrimary={() => ({})}
      onRequestPushPermissions={() => () => ({})}
      primaryNavText={'Finish'}
      BackgroundComponent={<BackgroundImage />}
    />
  ));
