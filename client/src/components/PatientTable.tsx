import { useNavigate } from '@tanstack/react-router';
import {
  DataGrid,
  type GridColDef,
  type GridRowParams,
} from '@mui/x-data-grid';

import { PatientStatusChip } from '~/components';
import { formatDate, getFullName } from '~/utils';
import type { Patient, PatientStatus, PaginationModel } from '~/types';

type PatientTableProps = {
  patients: Patient[];
  total: number;
  loading?: boolean;
  paginationModel: PaginationModel;
  onPaginationModelChange: (model: PaginationModel) => void;
};

export const PatientTable = ({
  patients,
  total,
  loading,
  paginationModel,
  onPaginationModelChange,
}: PatientTableProps) => {
  const navigate = useNavigate();

  const onRowClick = (params: GridRowParams) => {
    navigate({ to: '/patients/$id', params: { id: params.id.toString() } });
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'age', headerName: 'Age' },
    { field: 'last_visit', headerName: 'Last visit' },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <PatientStatusChip status={params.value as PatientStatus} />
      ),
    },
  ];

  const rows = patients.map((patient) => ({
    id: patient.id,
    name: getFullName(patient.first_name, patient.last_name),
    age: patient.age,
    last_visit: patient.last_visit
      ? formatDate(patient.last_visit, 'MM/dd/yyyy')
      : 'no visits',
    status: patient.status,
  }));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      paginationMode="server"
      rowCount={total}
      paginationModel={paginationModel}
      onPaginationModelChange={onPaginationModelChange}
      pageSizeOptions={[15, 25, 50]}
      onRowClick={onRowClick}
      sx={{
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer',
        },
      }}
    />
  );
};
