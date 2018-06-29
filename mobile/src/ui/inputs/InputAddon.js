import { View } from 'react-native';

import styled from 'ui/styled';

const InputAddon = styled(
  {
    justifyContent: 'center',
    alignItems: 'center',
  },
  'InputAddon'
)(View);

const AddonRow = styled(
  {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  'InputWrapper.Row'
)(View);

export { InputAddon as default, AddonRow };
