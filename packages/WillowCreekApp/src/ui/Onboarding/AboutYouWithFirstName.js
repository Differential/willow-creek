import React, { memo } from 'react';
import {
  AboutYouConnected,
  AboutYou,
  Slide,
  SlideContent,
} from '@apollosproject/ui-onboarding';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { H5, styled, withThemeMixin } from '@apollosproject/ui-kit';

const Label = styled({
  textTransform: 'uppercase',
  color: 'white',
})(H5);

const FIRST_NAME = gql`
  query getCurrentPersonFirstName {
    currentUser {
      id
      profile {
        id
        firstName
      }
    }
  }
`;

const RadioButton = withThemeMixin({
  colors: {
    primary: '#9BCBEB',
  },
})(AboutYou.RadioButton);
// This com
const AboutYouOverride = memo(
  ({
    description,
    defaultDate,
    genderList,
    values,
    touched,
    errors,
    setFieldValue,
    BackgroundComponent,
    firstName,
    ...props
  }) => (
    <Slide {...props}>
      {BackgroundComponent}
      <SlideContent
        title={`Hello ${firstName}!`}
        description={description}
        icon
      >
        <Label padded>Gender</Label>
        <AboutYou.Radio
          label="Gender"
          type="radio"
          value={get(values, 'gender')}
          error={get(touched, 'gender') && get(errors, 'gender')}
          onChange={(value) => setFieldValue('gender', value)}
        >
          {genderList.map((gender) => [
            <RadioButton
              key={gender}
              value={gender}
              label={() => <AboutYou.RadioLabel>{gender}</AboutYou.RadioLabel>}
              underline={false}
            />,
          ])}
        </AboutYou.Radio>
        <Label>Birthday</Label>
        <AboutYou.DateInput
          type={'DateInput'}
          placeholder={'Select a date...'}
          value={moment
            .utc(get(values, 'birthDate', defaultDate) || defaultDate)
            .toDate()}
          error={get(touched, 'birthDate') && get(errors, 'birthDate')}
          displayValue={
            // only show a birthday if we have one.
            get(values, 'birthDate', '') // DatePicker shows displayValue > placeholder > label in that order
              ? moment(values.birthDate).format('MM/DD/YYYY')
              : '' // Pass an empty string if we don't have a birthday to show the placeholder.
          }
          onChange={(value) =>
            setFieldValue('birthDate', moment.utc(value).toJSON())
          }
        />
      </SlideContent>
    </Slide>
  )
);

// The orginal component doesn't fetch firstName.
// We are adding an additional query to the component tree, so that we can use firstName inside the slide title.
const AboutYouWithFirstName = (props) => (
  <Query query={FIRST_NAME} networkPolicy="cache-first">
    {({ data }) => (
      <AboutYouOverride
        firstName={get(data, 'currentUser.profile.firstName', 'friend')}
        {...props}
      />
    )}
  </Query>
);

AboutYouOverride.defaultProps = AboutYou.defaultProps;

export default (props) => (
  <AboutYouConnected {...props} Component={AboutYouWithFirstName} />
);
