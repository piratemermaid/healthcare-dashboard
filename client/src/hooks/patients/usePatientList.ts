import { keepPreviousData, useQuery } from '@tanstack/react-query';

const API = import.meta.env.VITE_API_URL;

export const usePatientList = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ['patients', page, pageSize],
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
