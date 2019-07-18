import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { H5, Icon, styled, Button } from '@apollosproject/ui-kit';
import { withNavigation } from 'react-navigation';

const GET_USER_CAMPUS = gql`
  query {
    currentUser {
      id
      profile {
        id
        campus {
          id
          name
        }
      }
    }
  }
`;

const StyledButton = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 11,
  justifyContent: 'space-between',
}))(Button);

const CampusSelectButton = withNavigation(({ navigation, ...otherProps }) => (
  <Query query={GET_USER_CAMPUS} fetchPolicy="cache-and-network">
    {({
      data: {
        currentUser: { profile: { campus: { name } = {} } = {} } = {},
      } = {},
    }) => (
      <StyledButton
        type="ghost"
        onPress={() => navigation.navigate('Location')}
        {...otherProps}
      >
        <H5>{name || 'Select Campus'}</H5>
        <Icon name="arrow-down" size={16} />
      </StyledButton>
    )}
  </Query>
));

export default CampusSelectButton;
