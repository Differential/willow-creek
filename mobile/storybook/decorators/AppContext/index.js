/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';
import { nest } from 'recompose';

import { ThemeProvider } from '../../../src/ui/theme';

const Providers = nest(ThemeProvider);

export default function AppContent(renderStory) {
  return <Providers>{renderStory()}</Providers>;
}
