import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import styled from 'apolloschurchapp/src/ui/styled';

const FormFields = styled(({ theme }) => ({
  paddingTop: theme.sizing.baseUnit * 0.6,
  paddingBottom: theme.sizing.baseUnit / 2,
}))(PaddedView);

export default FormFields;
