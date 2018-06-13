import React from 'react';
import { WebView } from 'react-native';
import styled from 'ui/styled';

const FullScreenWebView = styled({
  width: '100%',
  height: '100%',
  flex: 1,
})(WebView);

const LiveModalScreen = () => (
  <FullScreenWebView source={{ uri: 'https://apollos.churchonline.org/' }} />
);

export default LiveModalScreen;
