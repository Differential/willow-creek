import { nest } from 'recompose';

import { ThemeProvider } from 'ui/theme';
import ClientProvider from 'client';
import { WebBrowserProvider } from 'ui/WebBrowser';

export default nest(ClientProvider, ThemeProvider, WebBrowserProvider);
