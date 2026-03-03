import { Link } from '@tanstack/react-router';
import { Box, Button, Stack, Typography } from '@mui/material';
import { WavingHand as HandIcon } from '@mui/icons-material';

export function NotFoundPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 2,
      }}
    >
      <Typography variant="h1">404</Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <HandIcon
          sx={{
            fontSize: 18,
            verticalAlign: 'middle',
            transform: 'scaleX(-1)',
          }}
        />
        <Typography variant="h6">
          This is not the page you are looking for
        </Typography>
        <HandIcon sx={{ fontSize: 18, verticalAlign: 'middle' }} />
      </Stack>
      <Button component={Link} to="/" variant="contained">
        Go home
      </Button>
    </Box>
  );
}
