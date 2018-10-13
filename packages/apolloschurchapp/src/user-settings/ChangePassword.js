import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Text as TextInput } from 'apolloschurchapp/src/ui/inputs';
import BackgroundView from 'apolloschurchapp/src/ui/BackgroundView';
import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import { ButtonLink } from 'apolloschurchapp/src/ui/Button';
import { H4 } from 'apolloschurchapp/src/ui/typography';
import styled from 'apolloschurchapp/src/ui/styled';
import ActivityIndicator from 'apolloschurchapp/src/ui/ActivityIndicator';

import getAuthToken from '../store/getAuthToken';
import changePassword from './passwordChange';

const Header = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 1.75,
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  backgroundColor: theme.colors.background.paper,
}))(PaddedView);

const SpaceHolder = PaddedView;

const DoneButton = styled(() => ({
  fontWeight: '800',
}))(ButtonLink);

class ChangePassword extends PureComponent {
  static navigationOptions = () => ({
    title: 'Personal Details',
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
      goBack: PropTypes.func,
    }),
  };

  render() {
    return (
      <Mutation
        mutation={changePassword}
        update={async (cache, { data: { token } }) => {
          await cache.writeQuery({
            query: getAuthToken,
            data: { authToken: token },
          });

          await cache.writeData({
            data: { authToken: token },
          });
        }}
      >
        {(updatePassword) => (
          <Formik
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
              confirmPassword: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .oneOf([Yup.ref('password')], 'Passwords must match.')
                .required('Password confirm is required'),
            })}
            onSubmit={async (variables, { setSubmitting, setFieldError }) => {
              try {
                await updatePassword({ variables });

                await this.props.navigation.goBack();
              } catch (e) {
                const { graphQLErrors } = e;
                if (graphQLErrors.length) {
                  setFieldError(
                    'confirmPassword',
                    'Unknown error. Please try again later.'
                  );
                }
              }
              setSubmitting(false);
            }}
          >
            {(props) => {
              if (props.isSubmitting) return <ActivityIndicator />;

              return (
                <ScrollView>
                  <Header>
                    <SpaceHolder />
                    <H4>Change Password</H4>
                    {props.dirty &&
                    props.values.password &&
                    props.values.confirmPassword ? (
                      <DoneButton onPress={props.handleSubmit}>Done</DoneButton>
                    ) : (
                      <DoneButton
                        onPress={() => this.props.navigation.goBack()}
                      >
                        Back
                      </DoneButton>
                    )}
                  </Header>
                  <BackgroundView>
                    <PaddedView>
                      <TextInput
                        label="New Password"
                        type="password"
                        value={props.values.password}
                        error={props.touched.password && props.errors.password}
                        onChangeText={(text) =>
                          props.setFieldValue('password', text)
                        }
                      />
                      <TextInput
                        label="Confirm Password"
                        type="password"
                        value={props.values.confirmPassword}
                        error={
                          props.touched.confirmPassword &&
                          props.errors.confirmPassword
                        }
                        onChangeText={(text) =>
                          props.setFieldValue('confirmPassword', text)
                        }
                      />
                    </PaddedView>
                  </BackgroundView>
                </ScrollView>
              );
            }}
          </Formik>
        )}
      </Mutation>
    );
  }
}

export default ChangePassword;
