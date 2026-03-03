import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './routes/__root';
import { Route as indexRoute } from './routes/index';
import { Route as patientsRoute } from './routes/patients';
import { Route as patientDetailRoute } from './routes/patients.$id';

const routeTree = rootRoute.addChildren([
  indexRoute,
  patientsRoute,
  patientDetailRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
