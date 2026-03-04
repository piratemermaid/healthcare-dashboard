import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';

import { QUERY_KEYS } from '~/constants';
import type { Patient, PatientStatus } from '~/types';

export type PatientCreatePayload = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  last_visit?: string | null;
  blood_type?: string | null;
  allergies?: string[];
  conditions?: string[];
  status?: PatientStatus;
};

export const useCreatePatient = (): UseMutationResult<
  Patient,
  Error,
  PatientCreatePayload
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PATIENTS] });
    },
  });
};

async function createPatient(
  payload: PatientCreatePayload
): Promise<Patient> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patients`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: payload.first_name,
        last_name: payload.last_name,
        date_of_birth: payload.date_of_birth,
        last_visit: payload.last_visit || null,
        status: payload.status ?? 'active',
        blood_type: payload.blood_type || null,
        allergies: payload.allergies ?? [],
        conditions: payload.conditions ?? [],
      }),
    }
  );

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      (body as { detail?: string }).detail ??
      response.statusText ??
      'Failed to create patient';
    throw new Error(message);
  }

  return response.json();
}
