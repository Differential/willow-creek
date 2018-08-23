import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import getAuthToken from '../getAuthToken';

import registerPersonMutation from './registerPerson';
import SignupForm from './Form';

const Signup = ({ onSignup }) => (
  <Mutation
    mutation={registerPersonMutation}
    update={(cache, { data: { registerPerson } }) => {
      cache.writeQuery({
        query: getAuthToken,
        data: { authToken: registerPerson.token },
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
