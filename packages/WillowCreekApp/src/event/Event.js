import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  GradientOverlayImage,
  BackgroundView,
  PaddedView,
  H2,
  Paragraph,
  StretchyView,
} from '@apollosproject/ui-kit';
import { SafeAreaView } from 'react-navigation';

import { FlexedScrollView, EventInfoItem } from './components';

const Event = ({ event, loading }) => {
  const coverImageSources = get(event, 'image.sources', []);
  return (
    <BackgroundView>
      <StretchyView>
        {({ Stretchy, ...scrollViewProps }) => (
          <FlexedScrollView {...scrollViewProps}>
            {coverImageSources.length || loading ? (
              <Stretchy>
                <GradientOverlayImage
                  isLoading={!coverImageSources.length && loading}
                  source={coverImageSources}
                />
              </Stretchy>
            ) : null}
            <SafeAreaView>
              <PaddedView vertical={false}>
                <H2 padded isLoading={!event.name && loading}>
                  {event.name}
                </H2>
                <Paragraph>
                  <EventInfoItem
                    icon={'time'}
                    title={moment(event.start).format('ddd, MMMM Do, YYYY')}
                    subtitle={`${moment(event.start).format('LT')} — ${moment(
                      event.end
                    ).format('LT')}`}
                  />
                  <EventInfoItem icon={'pin'} title={event.location} />
                </Paragraph>
              </PaddedView>
            </SafeAreaView>
          </FlexedScrollView>
        )}
      </StretchyView>
    </BackgroundView>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    __typename: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    location: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

export default Event;
