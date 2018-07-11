import PropTypes from 'prop-types';
import { View } from 'react-native';

import styled from 'ui/styled';

const CenterView = styled(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.background.default,
}))(View);

CenterView.defaultProps = {
  children: null,
};

CenterView.propTypes = {
  children: PropTypes.node,
};

export default CenterView;
