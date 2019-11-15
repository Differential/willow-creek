import React from 'react';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

import {
  AuthSMSPhoneEntryConnected,
  AuthPassword,
} from '@apollosproject/ui-auth';

import AuthSMSVerificationConnected from './AuthSMSVerificationConnected';

export AuthProvider from './AuthProvider';

const AuthNavigator = createStackNavigator(
  {
    AuthSMSPhoneEntryConnected,
    AuthSMSVerificationConnected,
    AuthPassword,
  },
  {
    initialRouteName: 'AuthSMSPhoneEntryConnected',
    headerMode: 'none',
    navigationOptions: { header: null },
  }
);

AuthNavigator.propTypes = {
  screenProps: PropTypes.shape({
    alternateLoginText: PropTypes.node,
    authTitleText: PropTypes.string,
    confirmationTitleText: PropTypes.string,
    confirmationPromptText: PropTypes.string,
    onFinishAuth: PropTypes.func,
    passwordPromptText: PropTypes.string,
    smsPolicyInfo: PropTypes.node,
    smsPromptText: PropTypes.string,
  }),
  BackgroundComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  emailRequired: PropTypes.bool,
};

const Auth = (props) => <AuthNavigator {...props} screenProps={props} />;
hoistNonReactStatic(Auth, AuthNavigator);

export default Auth;
