import { View } from 'react-native';
import { compose } from 'recompose';

import { enhancer as mediaQuery } from 'apollos-church-app/src/ui/MediaQuery';
import styled from 'apollos-church-app/src/ui/styled';

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
