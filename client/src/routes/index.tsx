import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';

import { HomePage } from '~/pages';

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

export const Route = indexRoute;
