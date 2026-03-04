import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';

import { QUERY_KEYS } from '~/constants';
import type { PatientNoteCreate } from '~/types';

export const useAddPatientNote = (
  id: string
): UseMutationResult<void, Error, PatientNoteCreate> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (note: PatientNoteCreate) => addPatientNote(id, note),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PATIENT_NOTES, id],
      });
    },
  });
};

async function addPatientNote(
  id: string,
  note: PatientNoteCreate
): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patients/${id}/notes`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    }
  );

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      (body as { detail?: string }).detail ??
      response.statusText ??
      'Failed to add patient note';
    throw new Error(message);
  }
}
