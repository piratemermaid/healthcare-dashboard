import { createRootRoute } from '@tanstack/react-router';

import { NotFoundPage } from '~/pages';

import { RootLayout } from './RootLayout';

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});
