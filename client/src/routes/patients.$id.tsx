import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';

import { PatientPage } from '~/pages';

const patientRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/patients/$id',
  component: PatientPage,
});

export const Route = patientRoute;
