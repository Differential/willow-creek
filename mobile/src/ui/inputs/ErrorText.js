import { H6 } from '/mobile/ui/typography';
import styled from '/mobile/ui/styled';

const ErrorText = styled(({ theme }) => ({
  color: theme.colors.alert,
  paddingTop: theme.sizing.baseUnit / 2,
}))(H6);

export default ErrorText;
