import { useParams } from '@tanstack/react-router';

export function PatientPage() {
  const { id } = useParams({ from: '/patients/$id' });

  return (
    <div>
      <h1>Patient id {id}</h1>
    </div>
  );
}
