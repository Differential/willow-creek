import { View } from 'react-native';
import { compose } from 'recompose';

import { enhancer as mediaQuery } from 'apolloschurchapp/src/ui/MediaQuery';
import styled from 'apolloschurchapp/src/ui/styled';

export default compose(
  mediaQuery(
    ({ md }) => ({ minWidth: md }),
    styled(
      {
        width: '41.6666666%',
        height: '100%',
        overflow: 'hidden',
      },
      'SideBySideView.Right'
    )
  )
)(View);
