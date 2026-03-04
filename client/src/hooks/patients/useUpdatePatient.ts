import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';

import { QUERY_KEYS } from '~/constants';
import type { Patient } from '~/types';

export type PatientUpdatePayload = Partial<{
  first_name: string;
  last_name: string;
  date_of_birth: string;
  last_visit: string | null;
  blood_type: string | null;
  allergies: string[];
  conditions: string[];
  status: Patient['status'];
}>;

export const useUpdatePatient = (
  id: string
): UseMutationResult<Patient, Error, PatientUpdatePayload> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PatientUpdatePayload) => updatePatient(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PATIENT, id] });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PATIENT_SUMMARY, id],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PATIENTS] });
    },
  });
};

async function updatePatient(
  id: string,
  payload: PatientUpdatePayload
): Promise<Patient> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patients/${id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      (body as { detail?: string }).detail ??
      response.statusText ??
      'Failed to update patient';
    throw new Error(message);
  }

  return response.json();
}
