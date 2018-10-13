import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Text as TextInput } from 'apolloschurchapp/src/ui/inputs';
import BackgroundView from 'apolloschurchapp/src/ui/BackgroundView';
import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import { ButtonLink } from 'apolloschurchapp/src/ui/Button';
import { H4 } from 'apolloschurchapp/src/ui/typography';
import styled from 'apolloschurchapp/src/ui/styled';
import ActivityIndicator from 'apolloschurchapp/src/ui/ActivityIndicator';

import getUserProfile from '../tabs/connect/getUserProfile';
import updateCurrentUser from './updateCurrentUser';

const Header = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 1.75,
  paddingRight: theme.sizing.baseUnit,
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  backgroundColor: theme.colors.background.paper,
}))(PaddedView);

const SpaceHolder = styled(() => ({}))(PaddedView);

const DoneButton = styled(() => ({
  fontWeight: '800',
}))(ButtonLink);

class PersonalDetails extends PureComponent {
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
      <Query query={getUserProfile} fetchPolicy="cache-and-network">
        {({ data: { currentUser = { profile: {} } } = {} }) => {
          const { firstName, lastName, email, nickName } = currentUser.profile;

          return (
            <Mutation
              mutation={updateCurrentUser}
              update={async (cache, { data: { updateProfileFields } }) => {
                await cache.writeQuery({
                  query: getUserProfile,
                  data: {
                    currentUser: {
                      ...currentUser,
                      profile: {
                        ...currentUser.profile,
                        firstName: updateProfileFields.firstName,
                        lastName: updateProfileFields.lastName,
                        email: updateProfileFields.email,
                        nickName: updateProfileFields.nickName,
                      },
                    },
                  },
                });
              }}
            >
              {(updateDetails) => (
                <Formik
                  initialValues={{ firstName, lastName, email, nickName }}
                  validationSchema={Yup.object().shape({
                    firstName: Yup.string().required('First Name is required!'),
                    lastName: Yup.string().required('Last Name is required!'),
                    email: Yup.string()
                      .email('Invalid email address')
                      .required('Email is required!'),
                    nickName: Yup.string().required('Nick Name is required!'),
                  })}
                  onSubmit={async (
                    variables,
                    { setSubmitting, setFieldError }
                  ) => {
                    try {
                      await updateDetails({ variables });
                      await this.props.navigation.goBack();
                    } catch (e) {
                      const { graphQLErrors } = e;
                      if (
                        graphQLErrors.length &&
                        graphQLErrors.find(({ message }) =>
                          message.includes('User already exists')
                        )
                      ) {
                        setFieldError(
                          'email',
                          'There is already a user with this email'
                        );
                      } else {
                        setFieldError(
                          'email',
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
                          <H4>Personal Details</H4>
                          {props.dirty ? (
                            <DoneButton onPress={props.handleSubmit}>
                              Done
                            </DoneButton>
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
                              label="Nick Name"
                              type="text"
                              value={props.values.nickName}
                              error={
                                props.touched.nickName && props.errors.nickName
                              }
                              onChangeText={(text) =>
                                props.setFieldValue('nickName', text)
                              }
                            />
                            <TextInput
                              label="First Name"
                              type="text"
                              value={props.values.firstName}
                              error={
                                props.touched.firstName &&
                                props.errors.firstName
                              }
                              onChangeText={(text) =>
                                props.setFieldValue('firstName', text)
                              }
                            />
                            <TextInput
                              label="Last Name"
                              type="text"
                              value={props.values.lastName}
                              error={
                                props.touched.lastName && props.errors.lastName
                              }
                              onChangeText={(text) =>
                                props.setFieldValue('lastName', text)
                              }
                            />
                          </PaddedView>
                          <PaddedView>
                            <TextInput
                              label="Email"
                              type="email"
                              value={props.values.email}
                              error={props.touched.email && props.errors.email}
                              onChangeText={(text) =>
                                props.setFieldValue('email', text)
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
        }}
      </Query>
    );
  }
}

export default PersonalDetails;
