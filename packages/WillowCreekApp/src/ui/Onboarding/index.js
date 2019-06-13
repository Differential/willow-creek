import React from 'react';

import { withThemeMixin, GradientOverlayImage, styled } from '@apollosproject/ui-kit';
import { ApolloConsumer } from 'react-apollo';
import { Image } from 'react-native';
import AskName from './AskName.js';
import AboutYouWithFirstName from './AboutYouWithFirstName';
import AskNotifications from './AskNotifications';
import {
  OnboardingSwiper,
} from '@apollosproject/ui-onboarding';

import { requestPushPermissions } from '@apollosproject/ui-notifications';

const BackgroundImage = styled({ position: 'absolute', width: '100%', height: '100%'})(Image);

function Onboarding({ navigation }) {
  return (
    <>
    <BackgroundImage
      source={require('./onboarding_bg.png')}
    />
    <OnboardingSwiper>
      {({ swipeForward }) => (
        <>
          <AskName
            onPressPrimary={swipeForward}
          />
          <AboutYouWithFirstName
            onPressPrimary={swipeForward}
          />
          <ApolloConsumer>
            {(client) => (
              <AskNotifications
                onPressPrimary={() => navigation.replace('Tabs')}
                onRequestPushPermissions={() =>
                  requestPushPermissions({ client })
                }
                primaryNavText={'Finish'}
              />
            )}
          </ApolloConsumer>
        </>
      )}
    </OnboardingSwiper>
    </>
  );
}

Onboarding.navigationOptions = {
  title: 'Onboarding',
  header: null,
  gesturesEnabled: false,
};

export default withThemeMixin({ type: 'dark' })(Onboarding);
