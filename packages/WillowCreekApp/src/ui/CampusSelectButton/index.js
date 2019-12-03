import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { get } from 'lodash';
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

const CampusSelectButton = withNavigation(
  ({ navigation, ButtonComponent = StyledButton, ...otherProps }) => (
    <Query query={GET_USER_CAMPUS} fetchPolicy="cache-and-network">
      {({ data: { currentUser: { profile } = {} } = {} }) => (
        <ButtonComponent
          type="ghost"
          onPress={() => navigation.navigate('Location')}
          {...otherProps}
        >
          <H5>{get(profile, 'campus.name') || 'Select Campus '} </H5>
          <Icon name="arrow-down" size={14} />
        </ButtonComponent>
      )}
    </Query>
  )
);

export default CampusSelectButton;
