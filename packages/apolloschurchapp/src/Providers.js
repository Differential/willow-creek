import { nest } from 'recompose';
import { Providers } from '@apollosproject/ui-kit';
import ClientProvider from './client';

export default nest(ClientProvider, Providers);
