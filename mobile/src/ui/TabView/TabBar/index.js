import { TabBar } from 'react-native-tab-view';
import { compose, withProps } from 'recompose';

import styled from '/mobile/ui/styled';
import { withTheme } from '/mobile/ui/theme';

import Label from './Label';
import Indicator from './Indicator';

const withStyles = compose(
  styled(
    ({ theme }) => ({
      backgroundColor: theme.colors.background.paper,
    }),
    'TabBar'
  ),
  withTheme(({ theme, indicatorColor }) => ({
    indicatorColor: indicatorColor || theme.colors.tertiary,
  }))
);

export default compose(
  withStyles,
  withProps({
    renderLabel: Label,
    renderIndicator: Indicator,
  })
)(TabBar);
