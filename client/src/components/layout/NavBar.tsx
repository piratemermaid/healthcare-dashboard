import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import { NavLink } from '~/components';
import { NAV_ROUTES } from '~/routes/routes';

type NavBarProps = {
  onMenuClick?: () => void;
};

export const NavBar = ({ onMenuClick }: NavBarProps) => {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Toolbar>
        {onMenuClick && (
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
          >
            Healthcare Dashboard
          </Typography>
          <Stack direction="row" spacing={2}>
            {NAV_ROUTES.map((route) => (
              <NavLink key={route.path} path={route.path} label={route.label} />
            ))}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
