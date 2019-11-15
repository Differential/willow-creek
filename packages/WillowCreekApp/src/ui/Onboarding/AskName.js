import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { TextInput, H5, ButtonLink } from '@apollosproject/ui-kit';
import { Mutation } from 'react-apollo';
import {
  StackActions,
  NavigationActions,
  withNavigation,
} from 'react-navigation';

import { Slide, SlideContent } from '@apollosproject/ui-onboarding';
import { LOGOUT } from '@apollosproject/ui-auth';

import AskNameConnected from './AskNameConnected';

// import updateUserName from './updateUserName';

// eslint-disable-next-line react/display-name
const AskName = memo(
  ({
    BackgroundComponent,
    onPressPrimary,
    slideTitle,
    description,
    firstName,
    lastName,
    values,
    touched,
    errors,
    setFieldValue,
    isLoading,
    existingUser,
    navigation,
    ...props
  }) => {
    let LastNameInput = null;
    let EmailInput = null;

    return (
      <Slide
        isLoading={isLoading}
        onPressPrimary={onPressPrimary}
        {...props}
        onPressSecondary={null}
      >
        {BackgroundComponent}
        <SlideContent
          title={slideTitle}
          description={
            existingUser
              ? 'We found a profile matching your phone number. Look correct?'
              : description
          }
          icon
        >
          <TextInput
            label={'First Name'}
            type={'text'}
            textContentType={'givenName'} // ios autofill
            returnKeyType={'next'}
            value={get(values, 'firstName')}
            error={
              get(touched, 'firstName', false) && get(errors, 'firstName', null)
            }
            onChangeText={(text) => setFieldValue('firstName', text)}
            onSubmitEditing={() => LastNameInput.focus()}
            disabled={isLoading || (existingUser && get(values, 'firstName'))}
            enablesReturnKeyAutomatically
          />
          <TextInput
            label={'Last Name'}
            type={'text'}
            textContentType={'familyName'} // ios autofill
            returnKeyType={'next'}
            value={get(values, 'lastName')}
            error={
              get(touched, 'lastName', false) && get(errors, 'lastName', null)
            }
            onChangeText={(text) => setFieldValue('lastName', text)}
            onSubmitEditing={() => EmailInput.focus()}
            disabled={isLoading || (existingUser && get(values, 'lastName'))}
            enablesReturnKeyAutomatically
            inputRef={(r) => {
              LastNameInput = r;
            }}
          />
          <TextInput
            label={'Email (optional)'}
            type={'email'}
            returnKeyType={'next'}
            value={get(values, 'email')}
            error={get(touched, 'email', false) && get(errors, 'email', null)}
            onChangeText={(text) => setFieldValue('email', text)}
            onSubmitEditing={onPressPrimary}
            disabled={isLoading || existingUser}
            enablesReturnKeyAutomatically
            inputRef={(r) => {
              EmailInput = r;
            }}
          />
          {existingUser ? (
            <Mutation mutation={LOGOUT}>
              {(handleLogout) => (
                <H5>
                  Not right?
                  {'\n'}
                  <ButtonLink
                    onPress={async () => {
                      await handleLogout();
                      // This resets the navigation stack and navigates to login with email screen
                      await navigation.dispatch(
                        StackActions.reset({
                          index: 0,
                          key: null,
                          actions: [
                            NavigationActions.navigate({
                              routeName: 'Auth',
                              action: NavigationActions.navigate({
                                routeName: 'AuthPassword',
                              }),
                            }),
                          ],
                        })
                      );
                    }}
                  >
                    Logout and sign up with an email and password ›
                  </ButtonLink>
                </H5>
              )}
            </Mutation>
          ) : null}
        </SlideContent>
      </Slide>
    );
  }
);

AskName.propTypes = {
  BackgroundComponent: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /* The `Swiper` component used in `<Onboading>` looks for and hijacks the title prop of it's
   * children. Thus we have to use more unique name.
   */
  existingUser: PropTypes.bool,
  setFieldValue: PropTypes.func.isRequired,
  slideTitle: PropTypes.string,
  description: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  touched: PropTypes.shape({}),
  errors: PropTypes.shape({}),
  values: PropTypes.shape({}),
  onPressPrimary: PropTypes.func,
  isLoading: PropTypes.bool,
};

AskName.defaultProps = {
  slideTitle: 'Welcome!',
  description: "Every relationship starts with a name. What's yours?",
};

const AskNameWithBackgroundImage = (props) => (
  <AskNameConnected Component={AskName} {...props} />
);

export default withNavigation(AskNameWithBackgroundImage);
