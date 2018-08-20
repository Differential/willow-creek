import LinearGradient from 'react-native-linear-gradient';
import { compose } from 'recompose';

import styled from 'apolloschurchapp/src/ui/styled';
import { withTheme } from 'apolloschurchapp/src/ui/theme';

const BackgroundView = compose(
  withTheme(({ theme }) => ({
    colors: [theme.colors.background.paper, theme.colors.background.screen],
  })),
  styled({ flex: 1 })
)(LinearGradient);

export default BackgroundView;
