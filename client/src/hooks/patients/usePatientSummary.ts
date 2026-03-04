import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { QUERY_KEYS } from '~/constants';
import type { PatientSummary } from '~/types';

export const usePatientSummary = (
  id: string
): UseQueryResult<PatientSummary> => {
  return useQuery({
    queryKey: [QUERY_KEYS.PATIENT_SUMMARY, id],
    queryFn: () => fetchPatientSummary(id),
  });
};

async function fetchPatientSummary(id: string): Promise<PatientSummary> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patients/${id}/summary`
  );
  return response.json();
}
