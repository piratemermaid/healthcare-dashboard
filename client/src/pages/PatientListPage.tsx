import { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';

import {
  EditPatientDialog,
  ErrorMessage,
  Loader,
  PatientTable,
} from '~/components';
import { useCreatePatient, usePatientList } from '~/hooks';
import type { PaginationModel } from '~/types';

export function PatientListPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [isAddPatientDialogOpen, setIsAddPatientDialogOpen] = useState(false);

  const { data, isLoading, isFetching, error } = usePatientList(page, pageSize);
  const {
    mutate: createPatient,
    isPending: isCreating,
    error: createError,
    reset: resetCreate,
  } = useCreatePatient();

  const handlePaginationChange = (model: PaginationModel) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const handleCloseAddDialog = () => {
    setIsAddPatientDialogOpen(false);
    resetCreate();
  };


  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (isLoading && !data) {
    return <Loader />;
  }

  return (
    <>
      <Stack spacing={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={() => setIsAddPatientDialogOpen(true)}
          sx={{ alignSelf: 'flex-end' }}
        >
          Add Patient
        </Button>
        <PatientTable
          patients={data?.items ?? []}
          total={data?.total ?? 0}
          loading={isFetching}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={handlePaginationChange}
        />
      </Stack>

      <EditPatientDialog
        open={isAddPatientDialogOpen}
        onClose={handleCloseAddDialog}
        patient={null}
        onSubmit={(data) =>
          createPatient(data, { onSuccess: handleCloseAddDialog })
        }
        isSubmitting={isCreating}
        error={createError?.message}
      />
    </>
  );
}
