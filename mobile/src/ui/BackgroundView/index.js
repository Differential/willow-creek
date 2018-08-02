import LinearGradient from 'react-native-linear-gradient';
import { compose } from 'recompose';

import styled from '/mobile/ui/styled';
import { withTheme } from '/mobile/ui/theme';

const BackgroundView = compose(
  withTheme(({ theme }) => ({
    colors: [theme.colors.background.paper, theme.colors.background.default],
  })),
  styled({ flex: 1 })
)(LinearGradient);

export default BackgroundView;
