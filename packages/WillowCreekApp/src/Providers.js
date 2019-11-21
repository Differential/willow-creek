import React from 'react';
import Config from 'react-native-config';
import { Providers } from '@apollosproject/ui-kit';
import { AnalyticsProvider } from '@apollosproject/ui-analytics';
import { MediaPlayerProvider } from '@apollosproject/ui-media-player';
import { NotificationsProvider } from '@apollosproject/ui-notifications';

import NavigationService from './NavigationService';
import { LiveProvider } from './live';
import ClientProvider from './client';
import customTheme, { customIcons } from './theme';
import { track, identify } from './amplitude';

import { AuthProvider } from './auth';

const AppProviders = (props) => (
  <ClientProvider {...props}>
    <NotificationsProvider
      oneSignalKey={Config.ONE_SIGNAL_KEY}
      navigate={NavigationService.navigate}
    >
      <AuthProvider
        navigateToAuth={() => NavigationService.navigate('Auth')}
        closeAuth={() => NavigationService.navigate('Onboarding')}
        useServerAnalytics={false}
      >
        <MediaPlayerProvider>
          <AnalyticsProvider
            trackFunctions={[track]}
            identifyFunctions={[identify]}
          >
            <LiveProvider>
              <Providers
                themeInput={customTheme}
                iconInput={customIcons}
                {...props}
              />
            </LiveProvider>
          </AnalyticsProvider>
        </MediaPlayerProvider>
      </AuthProvider>
    </NotificationsProvider>
  </ClientProvider>
);

export default AppProviders;
