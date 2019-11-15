import React, { memo } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import GET_USER_FIRST_AND_LAST_NAME from './getUserFirstAndLastName';
import AskName from './AskName';

import UPDATE_USER_NAME from './updateUserName';

// eslint-disable-next-line react/display-name
const AskNameConnected = memo(
  ({ Component, onPressPrimary, onPressSecondary, ...props }) => (
    <Query query={GET_USER_FIRST_AND_LAST_NAME}>
      {({
        loading,
        data: { authStatus, currentUser = { profile: {} } } = {},
      }) => {
        const { firstName, lastName, email } = currentUser.profile;

        return (
          <Mutation mutation={UPDATE_USER_NAME}>
            {updateName => (
              <Formik
                initialValues={{ firstName, lastName, email }}
                isInitialValid={() => !!(firstName && lastName)} // isInitialValid defaults to `false` this correctly checks for user data
                validationSchema={Yup.object().shape({
                  firstName: Yup.string().required(
                    'Your first name is required!'
                  ),
                  lastName: Yup.string().required(
                    'Your last name is required!'
                  ),
                  email: Yup.string().email('Email must be a valid email'),
                })}
                enableReinitialize
                onSubmit={async (
                  variables,
                  { setSubmitting, setFieldError }
                ) => {
                  try {
                    await updateName({ variables });
                    onPressPrimary();
                  } catch (e) {
                    const { graphQLErrors } = e;
                    if (
                      graphQLErrors.length &&
                      graphQLErrors.find(({ message }) =>
                        message.includes('User already exists')
                      )
                    ) {
                      setFieldError(
                        'firstName',
                        'There was a problem sending your request'
                      );
                    } else {
                      setFieldError(
                        'firstName',
                        'Unknown error. Please try again later.'
                      );
                    }
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  isValid,
                  isSubmitting,
                  submitForm,
                  values,
                  touched,
                  errors,
                  setFieldValue,
                }) => (
                  <Component
                    onPressPrimary={loading || isValid ? submitForm : null} // if form `isValid` show the primary nav button (next)
                    onPressSecondary={
                      // if form `!isValid` show the secondary nav button (skip)
                      isValid ? null : onPressSecondary || onPressPrimary // if onPressSecondary exists use it else default onPressPrimary
                    }
                    pressPrimaryEventName={'Ask Name Completed'}
                    pressSecondaryEventName={'Ask Name Skipped'}
                    firstName={firstName}
                    lastName={lastName}
                    values={values}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    existingUser={authStatus === 'NEW_USER_WITH_ROCK_PROFILE'}
                    isLoading={loading || isSubmitting}
                    {...props}
                  />
                )}
              </Formik>
            )}
          </Mutation>
        );
      }}
    </Query>
  )
);

AskNameConnected.propTypes = {
  // Custom component to be rendered. Defaults to AskName
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object,
  ]),
  onPressPrimary: PropTypes.func,
  onPressSecondary: PropTypes.func,
};

AskNameConnected.defaultProps = {
  Component: AskName,
};

AskNameConnected.displayName = 'AskNameConnected';

export default AskNameConnected;
