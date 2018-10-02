import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import getLoginState from './getLoginState';

class ProtectedAction extends PureComponent {
  queuedActionsToTriggerOnLogin = [];

  static propTypes = {
    children: PropTypes.func,
    navigation: PropTypes.shape({
      push: PropTypes.func,
    }),
    loading: PropTypes.bool,
    isLoggedIn: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    action: PropTypes.func.isRequired,
  };

  componentDidUpdate(oldProps) {
    if (!oldProps.isLoggedIn && this.props.isLoggedIn) {
      this.handleLogin();
    }

    if (
      oldProps.loading &&
      !this.props.loading &&
      !this.props.isLoggedIn &&
      this.queuedActionsToTriggerOnLogin.length
    ) {
      this.triggerLogin();
    }
  }

  handleLogin = () => {
    this.queuedActionsToTriggerOnLogin.forEach((action) => action());
    this.queuedActionsToTriggerOnLogin = [];
  };

  triggerLogin = () => this.props.navigation.push('Auth');

  protectedActionHandler = (action) => (...args) => {
    if (this.props.isLoggedIn) {
      action(...args);
    } else {
      this.queuedActionsToTriggerOnLogin.push(action.bind(this, ...args));
      if (!this.props.loading) this.triggerLogin();
    }
  };

  render() {
    return typeof this.props.children === 'function'
      ? this.props.children(this.protectedActionHandler(this.props.action))
      : this.props.children;
  }
}

const ProtectedActionWithQuery = (props) => (
  <Query query={getLoginState}>
    {({ data: { isLoggedIn = false } = {}, loading }) => (
      <ProtectedAction isLoggedIn={isLoggedIn} loading={loading} {...props} />
    )}
  </Query>
);

export default withNavigation(ProtectedActionWithQuery);
