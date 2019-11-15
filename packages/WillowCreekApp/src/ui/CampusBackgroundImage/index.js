import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
import { styled } from '@apollosproject/ui-kit';
import OverlayBackgroundImage from '../OverlayBackgroundImage';

const StyledOverlay = styled({ aspectRatio: 0.9 })(OverlayBackgroundImage);

const GET_CAMPUS_BG = gql`
  query campusBg {
    currentUser {
      id
      profile {
        id
        campus {
          id
          image {
            uri
          }
        }
      }
    }
  }
`;

const CampusBackgroundImage = (props) => (
  <Query query={GET_CAMPUS_BG} fetchPolicy="cache-and-network">
    {({ data: { currentUser } = {} }) => (
      <StyledOverlay
        {...props}
        source={get(currentUser, 'profile.campus.image')}
      />
    )}
  </Query>
);

export default CampusBackgroundImage;
