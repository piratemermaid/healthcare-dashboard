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
        sx={{
          color: 'primary.contrastText',
          outlineStyle: isActive ? 'solid' : 'none',
          outlineWidth: 0.2,
        }}
      >
        {label}
      </Button>
    </Link>
  );
};
