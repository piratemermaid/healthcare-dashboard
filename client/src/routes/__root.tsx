import { createRootRoute, Outlet } from '@tanstack/react-router';

import { SideBarLayout } from '~/components';

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <div>404 - Page not found</div>,
});

function RootLayout() {
  return (
    <SideBarLayout>
      <Outlet />
    </SideBarLayout>
  );
}
