import { H2, styled } from '@apollosproject/ui-kit';

export default styled(({ theme }) => ({
  marginTop: theme.sizing.baseUnit * 2,
  marginBottom: theme.sizing.baseUnit / 2,
}))(H2);
