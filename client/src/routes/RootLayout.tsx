import { Outlet } from '@tanstack/react-router';

import { SideBarLayout } from '~/components';

export function RootLayout() {
  return (
    <SideBarLayout>
      <Outlet />
    </SideBarLayout>
  );
}
