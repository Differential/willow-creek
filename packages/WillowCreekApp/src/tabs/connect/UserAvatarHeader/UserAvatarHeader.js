import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withNavigation } from 'react-navigation';

import UserAvatarView from 'WillowCreekApp/src/ui/UserAvatarView';
import PageTitle from 'WillowCreekApp/src/ui/PageTitle';

import {
  withIsLoading,
  Touchable,
  ConnectedImage,
  Icon,
  withTheme,
  styled,
  PaddedView,
  FlexedView,
  H6,
} from '@apollosproject/ui-kit';

const Container = styled(({ theme }) => ({
  alignItems: 'center',
  flexDirection: 'row',
  paddingTop: theme.sizing.baseUnit * 2,
  paddingBottom: 0,
}))(PaddedView);

const SettingsIcon = compose(
  withTheme(({ theme }) => ({
    name: 'settings',
    fill: theme.colors.text.tertiary,
  }))
)(Icon);

const UserAvatarHeader = ({
  firstName,
  lastName,
  location,
  photo,
  refetch,
  navigation,
  disabled,
  isLoading,
  isLoggedIn,
}) => (
  <Container>
    <FlexedView>
      <UserAvatarView
        location={isLoggedIn ? location : null}
        photo={isLoggedIn ? photo : null}
        refetch={refetch}
        disabled={disabled}
        isLoading={isLoading}
      >
        {isLoggedIn || isLoading ? (
          <PageTitle isLoading={!firstName && isLoading}>
            {firstName} {lastName}
          </PageTitle>
        ) : (
          <Touchable onPress={() => navigation.navigate('Auth')}>
            <View>
              <PageTitle>Log in Now</PageTitle>
              <H6>Track your progress and connect with community</H6>
            </View>
          </Touchable>
        )}
      </UserAvatarView>
    </FlexedView>
    {isLoggedIn ? (
      <Touchable
        onPress={() => navigation.navigate('UserSettings', { photo, refetch })}
      >
        <SettingsIcon />
      </Touchable>
    ) : null}
  </Container>
);

UserAvatarHeader.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  location: PropTypes.string,
  photo: ConnectedImage.propTypes.source,
  refetch: PropTypes.func,
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

export default withNavigation(withIsLoading(UserAvatarHeader));
