import React from 'react';
import {
  checkNotifications,
  openSettings,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';
import { withThemeMixin } from '@apollosproject/ui-kit';
import { ApolloConsumer } from 'react-apollo';
import { OnboardingSwiper } from '@apollosproject/ui-onboarding';

import BackgroundImage from '../CityBackgroundImage';
import AboutYouWithFirstName from './AboutYouWithFirstName';
import AskNotifications from './AskNotifications';

function Onboarding({ navigation }) {
  return (
    <>
      <BackgroundImage />
      <OnboardingSwiper>
        {({ swipeForward }) => (
          <>
            {/* <AskName onPressPrimary={swipeForward} /> */}
            <AboutYouWithFirstName onPressPrimary={swipeForward} />
            <AskNotifications
              onRequestPushPermissions={(update) => {
                checkNotifications().then((checkRes) => {
                  if (checkRes.status === RESULTS.DENIED) {
                    requestNotifications(['alert', 'badge', 'sound']).then(
                      () => {
                        update();
                      }
                    );
                  } else {
                    openSettings();
                  }
                });
              }}
              onPressPrimary={() => navigation.replace('Tabs')}
              primaryNavText={'Finish'}
            />
          </>
        )}
      </OnboardingSwiper>
    </>
  );
}

const OnboardingWithTheme = withThemeMixin({ type: 'onboarding' })(Onboarding);

OnboardingWithTheme.navigationOptions = {
  title: 'Onboarding',
  header: null,
  gesturesEnabled: false,
};

export default OnboardingWithTheme;
