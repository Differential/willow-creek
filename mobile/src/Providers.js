import { nest } from 'recompose';

import { ThemeProvider } from 'ui/theme';
import ClientProvider from 'client';

export default nest(ClientProvider, ThemeProvider);
