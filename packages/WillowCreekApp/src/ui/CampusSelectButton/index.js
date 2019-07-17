import React from 'react';
import { H5, Icon, styled, Button } from '@apollosproject/ui-kit';

const StyledButton = styled(({ theme }) => ({
  width: theme.sizing.baseUnit * 11,
  justifyContent: 'space-between',
}))(Button);

const CampusSelectButton = (props) => (
  <StyledButton type="ghost" {...props}>
    <H5>Select Campus</H5>
    <Icon name="arrow-down" size={16} />
  </StyledButton>
);

export default CampusSelectButton;
