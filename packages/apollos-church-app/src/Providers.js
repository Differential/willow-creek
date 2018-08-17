import { nest } from 'recompose';

import ClientProvider from 'apollos-church-app/src/client';
import { ThemeProvider } from 'apollos-church-app/src/ui/theme';
import { WebBrowserProvider } from 'apollos-church-app/src/ui/WebBrowser';

export default nest(ClientProvider, ThemeProvider, WebBrowserProvider);
