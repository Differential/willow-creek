/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ApolloConsumer, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import {
  AuthConsumer,
  AuthSMSVerification as Verification,
} from '@apollosproject/ui-auth';

const VERIFY_PIN = gql`
  mutation verifyPin($phone: String!, $code: String!) {
    authenticateWithSms(phoneNumber: $phone, pin: $code) {
      token
      status
    }
  }
`;

const HANDLE_LOGIN = gql`
  mutation handleLogin($authToken: String!, $status: String!) {
    handleLogin(authToken: $authToken, status: $status) @client
  }
`;

class VerificationConnected extends Component {
  static propTypes = {
    // Custom component to be rendered. Defaults to Verification
    Component: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
      PropTypes.object, // type check for React fragments
    ]),
    screenProps: PropTypes.shape({}), // we'll funnel screenProps into props
  };

  static defaultProps = {
    Component: Verification,
    screenProps: {},
  };

  validationSchema = Yup.object().shape({
    phone: Yup.string().matches(/^[6-9]\d{9}$/),
  });

  flatProps = { ...this.props, ...this.props.screenProps };

  handleOnSubmit = ({ verifyPin, closeAuth }) => async (
    { code },
    { setSubmitting, setFieldError }
  ) => {
    setSubmitting(true);
    try {
      await verifyPin({
        variables: { code, phone: this.props.navigation.state.params.phone },
      });
      closeAuth();
    } catch (e) {
      setFieldError(
        'code',
        'There was an error. Please double check your number and try again.'
      );
    }
    setSubmitting(false);
  };

  render() {
    return (
      <AuthConsumer>
        {({ closeAuth }) => (
          <ApolloConsumer>
            {(client) => (
              <Mutation
                mutation={VERIFY_PIN}
                update={(cache, { data: { authenticateWithSms } }) => {
                  client.mutate({
                    mutation: HANDLE_LOGIN,
                    variables: {
                      authToken: authenticateWithSms.token,
                      status: authenticateWithSms.status,
                    },
                  });
                }}
              >
                {(verifyPin) => (
                  <Formik
                    initialValues={{ code: '' }}
                    validationSchema={this.validationSchema}
                    onSubmit={this.handleOnSubmit({ verifyPin, closeAuth })}
                  >
                    {({
                      setFieldValue,
                      handleSubmit,
                      values,
                      isSubmitting,
                      isValid,
                      touched,
                      errors,
                    }) => (
                      <this.props.Component
                        errors={touched.code && errors}
                        disabled={isSubmitting || !isValid}
                        isLoading={isSubmitting}
                        onPressNext={handleSubmit}
                        setFieldValue={setFieldValue}
                        touched={touched}
                        values={values}
                        {...this.flatProps}
                      />
                    )}
                  </Formik>
                )}
              </Mutation>
            )}
          </ApolloConsumer>
        )}
      </AuthConsumer>
    );
  }
}

export default VerificationConnected;
