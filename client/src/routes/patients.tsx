import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';

import { PatientListPage } from '~/pages';

const patientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patients',
  component: PatientListPage,
});

export const Route = patientsRoute;
