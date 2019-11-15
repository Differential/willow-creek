import {
  AskNotificationsConnected,
  Slide,
  SlideContent,
} from '@apollosproject/ui-onboarding';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { styled, PaddedView, Button } from '@apollosproject/ui-kit';

import { FeatureRow, FeatureText, FeatureImage, Features } from './features';

const StyledSlideContent = styled({
  flex: 1,
  justifyContent: 'space-between',
})(SlideContent);

const PrimaryButton = styled({}, 'Onboarding.Slide.PrimaryButton')(Button);

// memo = sfc PureComponent 💥
// eslint-disable-next-line react/display-name
const AskNotifications = memo(
  ({
    BackgroundComponent,
    onPressPrimary,
    slideTitle,
    description,
    buttonText,
    buttonDisabled,
    onPressButton,
    ...props
  }) => (
    <Slide {...props}>
      {BackgroundComponent}
      <StyledSlideContent title={slideTitle} description={description} icon>
        <Features horizontal={false}>
          <FeatureRow>
            <FeatureImage source={require('./assets/worship.png')} />
            <FeatureText>Worship Moments</FeatureText>
          </FeatureRow>
          <FeatureRow>
            <FeatureImage source={require('./assets/teachings.png')} />
            <FeatureText>Featured Messages</FeatureText>
          </FeatureRow>
          <FeatureRow>
            <FeatureImage source={require('./assets/events.png')} />
            <FeatureText>Community Events</FeatureText>
          </FeatureRow>
        </Features>
        {buttonDisabled || onPressButton ? (
          <PaddedView horizontal={false}>
            <PrimaryButton
              title={buttonDisabled ? 'Continue' : buttonText}
              onPress={buttonDisabled ? onPressPrimary : onPressButton}
              pill={false}
            />
          </PaddedView>
        ) : null}
      </StyledSlideContent>
    </Slide>
  )
);

AskNotifications.displayName = 'AskNotifications';

AskNotifications.propTypes = {
  BackgroundComponent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /* The `Swiper` component used in `<onBoarding>` looks for and hijacks the title prop of it's
   * children. Thus we have to use a more unique name.
   */
  slideTitle: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  buttonDisabled: PropTypes.bool,
  onPressButton: PropTypes.func,
  onPressPrimary: PropTypes.func,
};

AskNotifications.defaultProps = {
  slideTitle: 'Can we keep you informed?',
  description:
    "We'll let you know when important things are happening and keep you in the loop",
  buttonText: 'Yes, enable notifications',
  buttonDisabled: false,
};

export default (props) => (
  <AskNotificationsConnected {...props} Component={AskNotifications} />
);
