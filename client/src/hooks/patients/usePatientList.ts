import {
  keepPreviousData,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query';

import { QUERY_KEYS } from '~/constants';
import type { PatientListResponse } from '~/types';

const API = import.meta.env.VITE_API_URL;

export const usePatientList = (
  page: number,
  pageSize: number
): UseQueryResult<PatientListResponse> => {
  return useQuery({
    queryKey: [QUERY_KEYS.PATIENTS, page, pageSize],
    queryFn: async () => {
      const res = await fetch(
        `${API}/patients?page=${page + 1}&page_size=${pageSize}`
      );
      return res.json();
    },
    placeholderData: keepPreviousData,
    staleTime: 60_000, // 1 min
  });
};
