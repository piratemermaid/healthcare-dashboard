import { DataGrid } from '@mui/x-data-grid';

export const PatientTable = () => {
  const patients = [
    { id: 1, first_name: 'John', last_name: 'Doe' },
    { id: 2, first_name: 'Jane', last_name: 'Smith' },
    { id: 3, first_name: 'Jim', last_name: 'Beam' },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },
  ];

  return (
    <DataGrid
      rows={patients}
      columns={columns}
      pageSizeOptions={[10, 25, 50]}
    />
  );
};
