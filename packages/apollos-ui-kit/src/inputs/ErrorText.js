import { H6 } from '../typography';
import styled from '../styled';

const ErrorText = styled(({ theme }) => ({
  color: theme.colors.alert,
  paddingTop: theme.sizing.baseUnit / 2,
}))(H6);

export default ErrorText;
