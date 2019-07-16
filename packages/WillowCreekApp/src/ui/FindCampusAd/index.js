import React from 'react';
import {
  FlexedView,
  PaddedView,
  H1,
  H5,
  Icon,
  ThemeMixin,
  BodyText,
  styled,
  Button,
} from '@apollosproject/ui-kit';
import BackgroundImage from '../CityBackgroundImage';

const Container = styled({
  flex: 1,
  justifyContent: 'center',
})(PaddedView);

const SelectCampusButton = styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 1.5,
  width: theme.sizing.baseUnit * 11,
  justifyContent: 'space-between',
}))(Button);

const FindCampusCard = () => (
  <FlexedView>
    <BackgroundImage />

    <Container>
      <ThemeMixin mixin={{ type: 'dark' }}>
        <H1>
          Find Your
          {'\n'}
          Willow Campus
        </H1>
        <BodyText>
          Whether you’re a longtime member or just exploring, we’ll help you
          find the right campus.
        </BodyText>
      </ThemeMixin>
      <SelectCampusButton type="ghost">
        <H5>Select Campus</H5>
        <Icon name="arrow-down" size={16} />
      </SelectCampusButton>
    </Container>
  </FlexedView>
);

export default FindCampusCard;
