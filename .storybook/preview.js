export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import React from 'react';
import AppProviders from '../src/utils/providers/AppProviders';
// .storybook/preview.j

export const decorators = [
  (Story) => (
    <AppProviders>
      <Story />
    </AppProviders>
  ),
];
