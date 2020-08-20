import React from 'react';
import { Query } from 'react-apollo';
import {
  checkNotifications,
  openSettings,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

import { withThemeMixin, NavigationService } from '@apollosproject/ui-kit';
import {
  OnboardingSwiper,
  onboardingComplete,
  WITH_USER_ID,
} from '@apollosproject/ui-onboarding';

import BackgroundImage from '../CityBackgroundImage';
import AskNotifications from './AskNotifications';

function Onboarding({ navigation }) {
  return (
    <>
      <BackgroundImage />
      <OnboardingSwiper>
        {({ swipeForward }) => (
          <>
            {/* <AskName onPressPrimary={swipeForward} /> */}
            {/* <AboutYouWithFirstName onPressPrimary={swipeForward} /> */}
            <Query query={WITH_USER_ID} fetchPolicy="network-only">
              {({
                data: { currentUser: { id } = { currentUser: { id: null } } },
              }) => (
                <AskNotifications
                  onPressPrimary={() => {
                    onboardingComplete({ userId: id });
                    navigation.dispatch(
                      NavigationService.resetAction({
                        navigatorName: 'Tabs',
                        routeName: 'Home',
                      })
                    );
                  }}
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
                  primaryNavText={'Finish'}
                />
              )}
            </Query>
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
