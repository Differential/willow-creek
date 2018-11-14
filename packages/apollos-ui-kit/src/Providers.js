import { nest } from 'recompose';

import { ThemeProvider } from './theme';
import { LayoutProvider } from './LayoutContext';

export default nest(ThemeProvider, LayoutProvider);
