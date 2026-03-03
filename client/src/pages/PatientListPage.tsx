import { useState } from 'react';

import { ErrorMessage, Loader, PatientTable } from '~/components';
import { usePatientList } from '~/hooks';
import type { PaginationModel } from '~/types';

export function PatientListPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  const { data, isLoading, isFetching, error } = usePatientList(page, pageSize);

  const handlePaginationChange = (model: PaginationModel) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (isLoading && !data) {
    return <Loader />;
  }

  return (
    <PatientTable
      patients={data?.items ?? []}
      total={data?.total ?? 0}
      loading={isFetching}
      paginationModel={{ page, pageSize }}
      onPaginationModelChange={handlePaginationChange}
    />
  );
}
