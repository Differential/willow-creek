import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import getUserProfile from '../getUserProfile';
import UserAvatarHeader from './UserAvatarHeader';

const UserAvatarHeaderConnected = ({ navigation }) => (
  <Query query={getUserProfile} fetchPolicy="cache-and-network">
    {({
      data: {
        currentUser: {
          profile: { photo, firstName, lastName, location } = {},
        } = {},
      } = {},
      refetch,
    }) => (
      <UserAvatarHeader
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