import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withNavigation } from 'react-navigation';

import { withIsLoading } from 'apolloschurchapp/src/ui/isLoading';
import Touchable from 'apolloschurchapp/src/ui/Touchable';
import UserAvatarView from 'apolloschurchapp/src/ui/UserAvatarView';
import ConnectedImage from 'apolloschurchapp/src/ui/ConnectedImage';
import Icon from 'apolloschurchapp/src/ui/Icon';
import { withTheme } from 'apolloschurchapp/src/ui/theme';
import styled from 'apolloschurchapp/src/ui/styled';
import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import FlexedView from 'apolloschurchapp/src/ui/FlexedView';

const Container = styled(({ theme }) => ({
  alignItems: 'center',
  flexDirection: 'row',
  /* This padding shouldn't be needed or at least not at such a high value but SafeAreaView doesn't
   * appear to work so here it is 🤷‍♂️
   * TODO: revisit and update/remove these values after next RN upgrade. */
  paddingTop: theme.sizing.baseUnit * 3,
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
}) => (
  <Container>
    <FlexedView>
      <UserAvatarView
        firstName={firstName}
        lastName={lastName}
        location={location}
        photo={photo}
        refetch={refetch}
        disabled={disabled}
        isLoading={isLoading}
      />
    </FlexedView>
    <Touchable
      onPress={() => navigation.navigate('UserSettings', { photo, refetch })}
    >
      <SettingsIcon />
    </Touchable>
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
};

export default withNavigation(withIsLoading(UserAvatarHeader));
