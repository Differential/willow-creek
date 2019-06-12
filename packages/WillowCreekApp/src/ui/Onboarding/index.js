import React from 'react';

import { withThemeMixin, GradientOverlayImage, styled } from '@apollosproject/ui-kit';
import { ApolloConsumer } from 'react-apollo';
import { Image } from 'react-native';
import AskNameWithBackgroundImage from './AskNameWithBackgroundImage.js';
import AboutYouWithFirstName from './AboutYouWithFirstName';
import AskNotifications from './AskNotifications';
import LocationFinder from './LocationFinder';
import {
  OnboardingSwiper,
} from '@apollosproject/ui-onboarding';

import { requestPushPermissions } from '@apollosproject/ui-notifications';

const BackgroundImage = styled({ position: 'absolute', width: '100%', height: '100%'})(Image);

function Onboarding({ navigation }) {
  return (
    <OnboardingSwiper showsPagination={false}>
      {({ swipeForward }) => (
        <>
          <AskNameWithBackgroundImage
            onPressPrimary={swipeForward}
            BackgroundComponent={
              <BackgroundImage
                source={require('./onboarding_bg.png')}
              />
            }
          />
          <AboutYouWithFirstName
            onPressPrimary={swipeForward}
            BackgroundComponent={
              <BackgroundImage
                source={require('./onboarding_bg.png')}
              />
            }
          />
          <LocationFinder
            onPressPrimary={swipeForward}
            onNavigate={() => {
              navigation.navigate('Location', {
                onFinished: swipeForward,
              });
            }}
            BackgroundComponent={
              <BackgroundImage
                source={require('./onboarding_bg.png')}
              />
            }
          />
          <ApolloConsumer>
            {(client) => (
              <AskNotifications
                onPressPrimary={() => navigation.replace('Tabs')}
                onRequestPushPermissions={() =>
                  requestPushPermissions({ client })
                }
                primaryNavText={'Finish'}
                BackgroundComponent={
              <BackgroundImage
                source={require('./onboarding_bg.png')}
              />
                }
              />
            )}
          </ApolloConsumer>
        </>
      )}
    </OnboardingSwiper>
  );
}

Onboarding.navigationOptions = {
  title: 'Onboarding',
  header: null,
  gesturesEnabled: false,
};

export default withThemeMixin({ type: 'dark' })(Onboarding);
