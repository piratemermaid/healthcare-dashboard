import { Link, useLocation } from '@tanstack/react-router';
import { Button } from '@mui/material';

import type { RouteConfig } from '~/types';

type NavLinkProps = RouteConfig;

export const NavLink = ({ path, label }: NavLinkProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === path;

  return (
    <Link to={path}>
      <Button
        variant="text"
        color="inherit"
        sx={{ color: isActive ? 'primary.contrastText' : 'inherit' }}
      >
        {label}
      </Button>
    </Link>
  );
};
