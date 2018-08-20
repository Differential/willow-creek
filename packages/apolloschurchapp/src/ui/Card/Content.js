import PaddedView from 'apolloschurchapp/src/ui/PaddedView';
import styled from 'apolloschurchapp/src/ui/styled';

const Content = styled(
  ({ theme }) => ({
    paddingVertical: theme.sizing.baseUnit * 0.75,
  }),
  'Card.Content'
)(PaddedView);

export default Content;
