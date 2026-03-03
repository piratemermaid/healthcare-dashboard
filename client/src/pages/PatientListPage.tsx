import { ErrorMessage, Loader, PatientTable } from '~/components';
import { usePatients } from '~/hooks';

export function PatientListPage() {
  const { data: patients, isLoading, error } = usePatients();

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <PatientTable patients={patients} />;
}
