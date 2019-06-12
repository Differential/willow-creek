import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  PaddedView,
  styled,
  Button,
  Touchable,
} from '@apollosproject/ui-kit';

import { Slide, LocationFinderConnected, LocationFinder } from '@apollosproject/ui-onboarding';

const PrimaryButton = styled({}, 'Onboarding.PrimaryButton')(Button)

const getCampusAddress = (campus) =>
  `${campus.street1}\n${campus.city}, ${campus.state} ${campus.postalCode}`;

// memo = sfc PureComponent 💥
const LocationFinderOverride = memo(
  ({
    onPressPrimary,
    BackgroundComponent,
    slideTitle,
    description,
    buttonText,
    buttonDisabled,
    onPressButton,
    isCurrentCampus,
    campus,
    ...props
  }) => (
    <Slide {...props}>
      {BackgroundComponent}
      <LocationFinder.SlideContent title={slideTitle} description={description} icon>
        {campus ? (
          <Touchable onPress={onPressButton}>
            <LocationFinder.CampusCard
              key={campus.id}
              distance={campus.distanceFromLocation}
              title={campus.name}
              description={getCampusAddress(campus)}
              images={[campus.image]}
            />
          </Touchable>
        ) : (
          <PaddedView horizontal={false}>
            <PrimaryButton
              title={buttonText}
              onPress={onPressButton}
              disabled={buttonDisabled}
              pill={false}
            />
          </PaddedView>
        )}
      </LocationFinder.SlideContent>
    </Slide>
  )
);

LocationFinderOverride.propTypes = LocationFinder.propTypes;

LocationFinderOverride.displayName = 'LocationFinder';

LocationFinderOverride.defaultProps = LocationFinder.defaultProps;

export default (props) => (<LocationFinderConnected Component={LocationFinderOverride} {...props} />);
