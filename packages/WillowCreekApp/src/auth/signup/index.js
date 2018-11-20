import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { track, events } from 'WillowCreekApp/src/analytics';

import handleLogin from '../handleLogin';
import { client } from '../../client'; //eslint-disable-line
import registerPersonMutation from './registerPerson';
import SignupForm from './Form';

const Signup = ({ onSignup }) => (
  <Mutation
    mutation={registerPersonMutation}
    update={(cache, { data: { registerPerson } }) => {
      client.mutate({
        mutation: handleLogin,
        variables: {
          authToken: registerPerson.token,
        },
        refetchQueries: ['getUserProfile', 'getAllLikedContent'],
      });
    }}
  >
    {(authenticate) => (
      <Formik
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
          password: Yup.string().required('Password is required!'),
        })}
        onSubmit={async (variables, { setSubmitting, setFieldError }) => {
          try {
            await authenticate({ variables });
            track({ eventName: events.UserSignup }); // TODO: Move signup logic to store/index and move tracking logic there also.
            if (onSignup) onSignup();
          } catch ({ graphQLErrors = [], ...e }) {
            if (
              graphQLErrors.length &&
              graphQLErrors.find(({ message }) =>
                message.includes('User already exists')
              )
            ) {
              setFieldError('email', 'There is already a user with this email');
            } else {
              setFieldError(
                'password',
                'Unknown error. Please try again later.'
              );
            }
          }
          setSubmitting(false);
        }}
      >
        {(formikBag) => <SignupForm {...formikBag} />}
      </Formik>
    )}
  </Mutation>
);

Signup.propTypes = {
  onSignup: PropTypes.func,
};

export default Signup;
