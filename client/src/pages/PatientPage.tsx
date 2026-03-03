import { Stack, Typography } from '@mui/material';
import { useParams } from '@tanstack/react-router';

import { ErrorMessage, Loader, PatientStatusChip } from '~/components';
import { usePatient } from '~/hooks';
import { formatDate, getFullName, getPatientAge } from '~/utils';

export function PatientPage() {
  const { id } = useParams({ from: '/patients/$id' });

  const { data: patient, isLoading, error } = usePatient(id);

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        {getFullName(patient.first_name, patient.last_name)}
      </Typography>
      <Stack>
        <Typography variant="body1">
          Age: {getPatientAge(patient.date_of_birth)}
        </Typography>
        <Typography variant="body1">
          Last visit: {formatDate(patient.last_visit, 'MM/dd/yyyy')}
        </Typography>
        <Typography variant="body1">
          Status: <PatientStatusChip status={patient.status} />
        </Typography>
      </Stack>
    </Stack>
  );
}
