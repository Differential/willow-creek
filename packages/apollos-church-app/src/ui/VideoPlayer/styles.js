import { View, StyleSheet, Platform } from 'react-native';

import styled from 'apollos-church-app/src/ui/styled';
import Touchable from 'apollos-church-app/src/ui/Touchable';
import { withTheme } from 'apollos-church-app/src/ui/theme';
import Icon from 'apollos-church-app/src/ui/Icon';

const VideoWrapper = styled({
  position: 'relative',
})(View);

const PlayButton = styled({
  zIndex: 2,
  ...StyleSheet.absoluteFillObject,
  ...Platform.select({
    ios: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
})(Touchable);

const PlayIcon = withTheme(
  ({ theme: { colors: { lightPrimary } = {} } = {} }) => ({
    name: 'play',
    size: 50, // TODO: should this be set in a typographic unit?
    fill: lightPrimary, // TODO: should this reference a text color?
  })
)(Icon);

const AndroidPositioningFix = styled({
  ...StyleSheet.absoluteFillObject,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1,
})(View);

export { VideoWrapper, PlayButton, PlayIcon, AndroidPositioningFix };
