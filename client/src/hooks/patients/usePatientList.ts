import { useQuery } from '@tanstack/react-query';

export const usePatientList = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: () => fetchPatientList(),
  });
};

async function fetchPatientList() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/patients`);
  return response.json();
}
