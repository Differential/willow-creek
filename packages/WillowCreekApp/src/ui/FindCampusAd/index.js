import React from 'react';
import {
  FlexedView,
  PaddedView,
  H1,
  ThemeMixin,
  BodyText,
  styled,
} from '@apollosproject/ui-kit';
import BackgroundImage from '../CityBackgroundImage';
import CampusSelectButton from '../CampusSelectButton';

const Container = styled({
  flex: 1,
  justifyContent: 'center',
})(PaddedView);

const FindCampusCard = () => (
  <FlexedView>
    <BackgroundImage />

    <Container>
      <PaddedView horizontal={false}>
        <ThemeMixin mixin={{ type: 'dark' }}>
          <H1>
            Find Your
            {'\n'}
            Willow Campus
          </H1>
          <BodyText>
            Whether you’ve attended Willow for a long time, or just exploring,
            we’ll help you find the right campus.
          </BodyText>
        </ThemeMixin>
      </PaddedView>
      <CampusSelectButton />
    </Container>
  </FlexedView>
);

export default FindCampusCard;
