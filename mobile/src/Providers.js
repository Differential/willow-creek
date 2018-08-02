import { nest } from 'recompose';

import ClientProvider from '/mobile/client';
import { ThemeProvider } from '/mobile/ui/theme';
import { WebBrowserProvider } from '/mobile/ui/WebBrowser';

export default nest(ClientProvider, ThemeProvider, WebBrowserProvider);
