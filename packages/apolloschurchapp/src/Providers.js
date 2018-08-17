import { nest } from 'recompose';

import ClientProvider from 'apolloschurchapp/src/client';
import { ThemeProvider } from 'apolloschurchapp/src/ui/theme';
import { WebBrowserProvider } from 'apolloschurchapp/src/ui/WebBrowser';

export default nest(ClientProvider, ThemeProvider, WebBrowserProvider);
