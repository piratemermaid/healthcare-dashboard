import { createRootRoute, Link, Outlet } from '@tanstack/react-router';

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <div>404 - Page not found</div>,
});

function RootLayout() {
  return (
    <>
      <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
        <Link to="/">Home</Link>
      </nav>
      <Outlet />
    </>
  );
}
