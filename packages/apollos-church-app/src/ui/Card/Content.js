import PaddedView from 'apollos-church-app/src/ui/PaddedView';
import styled from 'apollos-church-app/src/ui/styled';

const Content = styled(
  ({ theme }) => ({
    paddingVertical: theme.sizing.baseUnit * 0.75,
  }),
  'Card.Content'
)(PaddedView);

export default Content;
