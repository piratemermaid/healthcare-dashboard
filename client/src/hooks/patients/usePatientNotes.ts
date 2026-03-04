import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { QUERY_KEYS } from '~/constants';
import type { PatientNoteListResponse } from '~/types';

export const usePatientNotes = (
  id: string
): UseQueryResult<PatientNoteListResponse> => {
  return useQuery({
    queryKey: [QUERY_KEYS.PATIENT_NOTES, id],
    queryFn: () => fetchPatientNotes(id),
  });
};

async function fetchPatientNotes(id: string): Promise<PatientNoteListResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patients/${id}/notes`
  );

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      (body as { detail?: string }).detail ??
      response.statusText ??
      'Failed to fetch patient notes';
    throw new Error(message);
  }

  return response.json();
}
