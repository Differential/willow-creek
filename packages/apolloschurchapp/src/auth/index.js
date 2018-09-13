import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, SafeAreaView } from 'react-native';

import { withTheme } from 'apolloschurchapp/src/ui/theme';
import FlexedView from 'apolloschurchapp/src/ui/FlexedView';
import TabView, { SceneMap } from 'apolloschurchapp/src/ui/TabView';
import { H1, H5 } from 'apolloschurchapp/src/ui/typography';
import styled from 'apolloschurchapp/src/ui/styled';
import Icon from 'apolloschurchapp/src/ui/Icon';
import { ButtonLink } from 'apolloschurchapp/src/ui/Button';
import { track } from 'apolloschurchapp/src/analytics';

import LoginForm from './login';
import SignUpForm from './signup';

export LoginButton from './LoginButton';

const Title = styled(({ theme }) => ({ color: theme.colors.primary }))(H1);

const BrandIcon = withTheme(({ theme }) => ({
  name: 'brand-icon',
  size: theme.sizing.baseUnit * 2.25,
  marginVertical: theme.sizing.baseUnit,
  fill: theme.colors.primary,
}))(Icon);

const HeaderContainer = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
}))(SafeAreaView);

const Header = styled(({ theme }) => ({
  paddingHorizontal: theme.sizing.baseUnit,
  paddingBottom: theme.sizing.baseUnit * 1.5,
}))(View);

const CancelButton = styled(({ theme }) => ({
  alignSelf: 'flex-end',
  marginTop: theme.sizing.baseUnit * 0.75,
  marginRight: theme.sizing.baseUnit,
}))(ButtonLink);

class Auth extends PureComponent {
  static navigationOptions = {
    title: 'Login',
  };

  tabRoutes = [
    { title: 'Sign In', key: 'login' },
    { title: 'Register', key: 'signup' },
  ];

  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func,
    }),
  };

  handleFinish = () => {
    // trigger the auth modal to close
    track({ eventName: 'UserLogin' });
    this.props.navigation.goBack();
  };

  renderLogin = () => <LoginForm onLogin={this.handleFinish} />;

  renderSignup = () => <SignUpForm onSignup={this.handleFinish} />;

  render() {
    return (
      <FlexedView>
        <HeaderContainer>
          <CancelButton onPress={this.handleFinish}>Cancel</CancelButton>
          <Header>
            <BrandIcon />
            <Title>Welcome!</Title>
            <H5>Please sign in to continue</H5>
          </Header>
        </HeaderContainer>
        <TabView
          routes={this.tabRoutes}
          renderScene={SceneMap({
            login: this.renderLogin,
            signup: this.renderSignup,
          })}
        />
      </FlexedView>
    );
  }
}

export default Auth;
