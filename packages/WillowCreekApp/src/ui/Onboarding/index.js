import React from 'react';

import { withThemeMixin } from '@apollosproject/ui-kit';
import { ApolloConsumer } from 'react-apollo';
import { OnboardingSwiper } from '@apollosproject/ui-onboarding';
import { requestPushPermissions } from '@apollosproject/ui-notifications';
import BackgroundImage from '../CityBackgroundImage';
import AskName from './AskName';
import AboutYouWithFirstName from './AboutYouWithFirstName';
import AskNotifications from './AskNotifications';

function Onboarding({ navigation }) {
  return (
    <>
      <BackgroundImage />
      <OnboardingSwiper>
        {({ swipeForward }) => (
          <>
            <AskName onPressPrimary={swipeForward} />
            <AboutYouWithFirstName onPressPrimary={swipeForward} />
            <ApolloConsumer>
              {client => (
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

const OnboardingWithTheme = withThemeMixin({ type: 'dark' })(Onboarding);

OnboardingWithTheme.navigationOptions = {
  title: 'Onboarding',
  header: null,
  gesturesEnabled: false,
};

export default OnboardingWithTheme;
