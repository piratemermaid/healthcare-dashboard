import { useQuery } from '@tanstack/react-query';

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => fetchPatient(id),
  });
};

async function fetchPatient(id: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patients/${id}`
  );

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      (body as { detail?: string }).detail ?? response.statusText ?? 'Failed to fetch patient';
    throw new Error(message);
  }

  return response.json();
}
