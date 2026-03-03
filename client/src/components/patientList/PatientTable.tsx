import { useNavigate } from '@tanstack/react-router';
import {
  DataGrid,
  type GridColDef,
  type GridRowParams,
} from '@mui/x-data-grid';

import { PatientStatusChip } from '.';
import { formatDate, getFullName, getPatientAge } from '~/utils';
import type { Patient, PatientStatus } from '~/types';

type PatientTableProps = {
  patients: Patient[];
};

export const PatientTable = ({ patients }: PatientTableProps) => {
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
    age: getPatientAge(patient.date_of_birth),
    last_visit: patient.last_visit
      ? formatDate(patient.last_visit, 'MM/dd/yyyy')
      : 'no visits',
    status: patient.status,
  }));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel: { pageSize: 15 } } }}
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
