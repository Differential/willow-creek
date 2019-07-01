import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import { Image } from 'react-native';
import { styled } from '@apollosproject/ui-kit';
import Onboarding from '.';
import AskNotifications from './AskNotifications';

const BackgroundImage = styled({ position: 'absolute', width: '100%', height: '100%'})(Image);

storiesOf('Onboarding', module)
  .add('full', () => <Onboarding />)
  .add('AskNotifications', () => (
    <AskNotifications
      onPressPrimary={() => ({})}
      onRequestPushPermissions={() =>
        () => ({})
      }
      primaryNavText={'Finish'}
      BackgroundComponent={
        <BackgroundImage
          source={require('./onboarding_bg.png')}
        />
      }
    />
  ));
