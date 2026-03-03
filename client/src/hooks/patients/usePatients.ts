import { useQuery } from '@tanstack/react-query';

export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: () => fetchPatients(),
  });
};

async function fetchPatients() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/patients`);
  return response.json();
}
