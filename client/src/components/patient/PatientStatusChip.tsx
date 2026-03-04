import { Chip } from '@mui/material';

import type { PatientStatus } from '~/types';

type PatientStatusChipProps = {
  status: PatientStatus;
};

export const PatientStatusChip = ({ status }: PatientStatusChipProps) => {
  const getColor = (status: PatientStatus) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
      case 'discharged':
        return 'default';
    }
  };

  const color = getColor(status);

  return <Chip label={status} color={color} size="small" />;
};
