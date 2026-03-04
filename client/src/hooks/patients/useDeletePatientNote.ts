import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';

import { QUERY_KEYS } from '~/constants';

export const useDeletePatientNote = (
  patientId: string
): UseMutationResult<void, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => deletePatientNote(patientId, noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PATIENT_NOTES, patientId],
      });
    },
  });
};

async function deletePatientNote(
  patientId: string,
  noteId: number
): Promise<void> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patients/${patientId}/notes/${noteId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      (body as { detail?: string }).detail ??
      response.statusText ??
      'Failed to delete patient note';
    throw new Error(message);
  }
}
