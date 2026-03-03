import { createRootRoute, Outlet } from '@tanstack/react-router';

import { SideBarLayout } from '~/components';
import { NotFoundPage } from '~/pages';

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

function RootLayout() {
  return (
    <SideBarLayout>
      <Outlet />
    </SideBarLayout>
  );
}
