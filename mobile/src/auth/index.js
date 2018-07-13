import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PaddedView from 'ui/PaddedView';

import LoginForm from './login';

export LoginButton from './LoginButton';

class Auth extends PureComponent {
  static navigationOptions = {
    title: 'Login',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func,
    }),
  };

  handleLogin = () => {
    // trigger the auth modal to close
    this.props.navigation.goBack();
  };

  render() {
    return (
      <PaddedView>
        <LoginForm onLogin={this.handleLogin} />
      </PaddedView>
    );
  }
}

export default Auth;
