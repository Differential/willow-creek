import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, SafeAreaView } from 'react-native';

import {
  FlexedView,
  TabView,
  TabSceneMap as SceneMap,
  H1,
  H5,
  styled,
  Icon,
  ButtonLink,
  withTheme,
} from '@apollosproject/ui-kit';

import { track } from 'apolloschurchapp/src/analytics';

import LoginForm from './login';
import SignUpForm from './signup';

export LoginButton from './LoginButton';
export ProtectedAction from './ProtectedAction';

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
  padding: theme.sizing.baseUnit,
  paddingBottom: theme.sizing.baseUnit * 1.5,
}))(View);

const CancelButton = styled(({ theme }) => ({
  alignSelf: 'flex-end',
  paddingTop: theme.sizing.baseUnit * 0.75,
  paddingRight: theme.sizing.baseUnit,
}))(ButtonLink);

class Auth extends PureComponent {
  static navigationOptions = {
    header: null,
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
