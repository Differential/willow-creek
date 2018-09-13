import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';

import { ButtonLink } from 'apolloschurchapp/src/ui/Button';
import styled from 'apolloschurchapp/src/ui/styled';
import ActivityIndicator from 'apolloschurchapp/src/ui/ActivityIndicator';

import logout from './logout';
import getLoginState from './getLoginState';

const Button = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
}))(ButtonLink);

class LoginButton extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  handleLoginPress = () => this.props.navigation.push('Auth');

  renderLogoutButton = () => (
    <Mutation mutation={logout}>
      {(handleLogout) => <Button onPress={() => handleLogout()}>Logout</Button>}
    </Mutation>
  );

  render() {
    return (
      <Query query={getLoginState}>
        {({ data: { isLoggedIn = false, loading } }) => {
          if (loading) return <ActivityIndicator />;
          if (isLoggedIn) return this.renderLogoutButton();
          return <Button onPress={this.handleLoginPress}>Login</Button>;
        }}
      </Query>
    );
  }
}

export default withNavigation(LoginButton);
