import { nest } from 'recompose';

import ClientProvider from 'apolloschurchapp/src/client';
import { ThemeProvider } from 'apolloschurchapp/src/ui/theme';
import { WebBrowserProvider } from 'apolloschurchapp/src/ui/WebBrowser';
import { LayoutProvider } from 'apolloschurchapp/src/ui/LayoutContext';

export default nest(
  ClientProvider,
  ThemeProvider,
  WebBrowserProvider,
  LayoutProvider
);
