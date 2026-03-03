import { ErrorMessage, Loader, PatientTable } from '~/components';
import { usePatientList } from '~/hooks';

export function PatientListPage() {
  const { data: patients, isLoading, error } = usePatientList();

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return <PatientTable patients={patients} />;
}
