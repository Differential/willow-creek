import React from 'react';
import { Providers } from '@apollosproject/ui-kit';
import { AuthProvider } from '@apollosproject/ui-auth';
import { AnalyticsProvider } from '@apollosproject/ui-analytics';
import NavigationService from './NavigationService';
import { NotificationsManager } from './notifications';
import ClientProvider from './client';
import theme from './theme';

const AppProviders = (props) => (
  <ClientProvider {...props}>
    <NotificationsManager>
      <AuthProvider
        navigateToAuth={() => NavigationService.navigate('Auth')}
        closeAuth={() => NavigationService.navigate('Onboarding')}
      >
        <AnalyticsProvider>
          <Providers themeInput={theme} {...props} />
        </AnalyticsProvider>
      </AuthProvider>
    </NotificationsManager>
  </ClientProvider>
);

export default AppProviders;
