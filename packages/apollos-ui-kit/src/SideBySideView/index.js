import { View } from 'react-native';
import { compose, renderComponent } from 'recompose';

import styled from '../styled';
import { enhancer as mediaQuery } from '../MediaQuery';
import Right from './Right';
import Left from './Left';

export { default as Right } from './Right';
export { default as Left } from './Left';

const SideBySideView = styled(({ reversed = false, stretched = true }) => ({
  flexDirection: reversed ? 'row-reverse' : 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  alignItems: stretched ? 'stretch' : 'center',
}))(View);

const ResponsiveSideBySideView = compose(
  mediaQuery(({ md }) => ({ minWidth: md }), renderComponent(SideBySideView))
)(View);

SideBySideView.Right = Right;
SideBySideView.Left = Left;

export { SideBySideView as default, ResponsiveSideBySideView };
