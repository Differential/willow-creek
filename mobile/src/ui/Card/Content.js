import PaddedView from '/mobile/ui/PaddedView';
import styled from '/mobile/ui/styled';

const Content = styled(
  ({ theme }) => ({
    paddingVertical: theme.sizing.baseUnit * 0.75,
  }),
  'Card.Content'
)(PaddedView);

export default Content;
