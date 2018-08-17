import { H6 } from 'apollos-church-app/src/ui/typography';
import styled from 'apollos-church-app/src/ui/styled';

const ErrorText = styled(({ theme }) => ({
  color: theme.colors.alert,
  paddingTop: theme.sizing.baseUnit / 2,
}))(H6);

export default ErrorText;
