import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import getUserProfile from '../getUserProfile';
import UserAvatarHeader from './UserAvatarHeader';

const UserAvatarHeaderConnected = ({ navigation }) => (
  <Query query={getUserProfile} fetchPolicy="cache-and-network">
    {({
      data: {
        isLoggedIn,
        currentUser: {
          profile: { photo, firstName, lastName, location } = {},
        } = {},
      } = {},
      refetch,
      loading,
    }) => (
      <UserAvatarHeader
        isLoading={loading}
        isLoggedIn={isLoggedIn}
        firstName={firstName}
        lastName={lastName}
        location={location}
        photo={photo}
        refetch={refetch}
        navigation={navigation}
        disabled
      />
    )}
  </Query>
);

UserAvatarHeaderConnected.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }),
};

export default UserAvatarHeaderConnected;
