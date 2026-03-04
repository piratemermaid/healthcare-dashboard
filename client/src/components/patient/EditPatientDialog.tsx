import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import { AddableTextFieldList, ErrorMessage } from '~/components';
import { STATUS_OPTIONS } from '~/constants';
import { useUpdatePatient } from '~/hooks';
import type { Patient, PatientStatus } from '~/types';

type EditPatientFormValues = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  last_visit: string;
  home_phone: string;
  cell_phone: string;
  work_phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip_code: string;
  allergies: { value: string }[];
  conditions: { value: string }[];
  blood_type: string;
  status: PatientStatus;
};

type EditPatientDialogProps = {
  open: boolean;
  onClose: () => void;
  patient?: Patient | null;
  isLoading: boolean;
  error: string;
};

const defaultFormValues: EditPatientFormValues = {
  first_name: '',
  last_name: '',
  date_of_birth: '',
  last_visit: '',
  home_phone: '',
  cell_phone: '',
  work_phone: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip_code: '',
  allergies: [],
  conditions: [],
  blood_type: '',
  status: 'active',
};

export const EditPatientDialog = ({
  open,
  onClose,
  patient,
  isLoading,
  error,
}: EditPatientDialogProps) => {
  const { control, handleSubmit, reset } = useForm<EditPatientFormValues>({
    defaultValues: defaultFormValues,
  });

  const [dialogError, setDialogError] = useState(error ?? '');

  const { mutate: updatePatient, isPending: isUpdating } = useUpdatePatient(
    patient?.id?.toString() ?? ''
  );

  const handleClose = () => {
    setDialogError(error ?? '');
    reset(defaultFormValues);
    onClose();
  };

  useEffect(() => {
    if (open && patient) {
      reset({
        ...defaultFormValues,
        first_name: patient.first_name,
        last_name: patient.last_name,
        date_of_birth: String(patient.date_of_birth).slice(0, 10),
        last_visit: patient.last_visit
          ? String(patient.last_visit).slice(0, 10)
          : '',
        home_phone: '',
        cell_phone: '',
        work_phone: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip_code: '',
        blood_type: patient.blood_type ?? '',
        allergies: (patient.allergies ?? []).map((v) => ({ value: v })),
        conditions: (patient.conditions ?? []).map((v) => ({ value: v })),
        status: patient.status,
      });
    }
  }, [open, patient, reset]);

  const onSubmit = (data: EditPatientFormValues) => {
    if (!patient?.id) return;
    updatePatient(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth,
        last_visit: data.last_visit || null,
        blood_type: data.blood_type || null,
        allergies: data.allergies.map((a) => a.value),
        conditions: data.conditions.map((c) => c.value),
        status: data.status,
      },
      {
        onSuccess: handleClose,
        onError: (err) => setDialogError(err.message),
      }
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Edit Patient</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ minWidth: 400, pt: 1 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                Personal Info
              </Typography>
              <Controller
                name="first_name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="First Name" fullWidth />
                )}
              />
              <Controller
                name="last_name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Last Name" fullWidth />
                )}
              />
              <Controller
                name="date_of_birth"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
              <Controller
                name="last_visit"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Visit"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
              <Typography variant="subtitle2" color="text.secondary">
                Contact
              </Typography>
              <Controller
                name="home_phone"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Home Phone" fullWidth />
                )}
              />
              <Controller
                name="cell_phone"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Cell Phone" fullWidth />
                )}
              />
              <Controller
                name="work_phone"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Work Phone" fullWidth />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Email" type="email" fullWidth />
                )}
              />
              <Typography variant="subtitle2" color="text.secondary">
                Address
              </Typography>
              <Controller
                name="address1"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Address line 1" fullWidth />
                )}
              />
              <Controller
                name="address2"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Address line 2" fullWidth />
                )}
              />
              <Stack direction="row" spacing={2}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="City" fullWidth />
                  )}
                />
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="State" fullWidth />
                  )}
                />
                <Controller
                  name="zip_code"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="ZIP" fullWidth />
                  )}
                />
              </Stack>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                Medical Info
              </Typography>
              <Controller
                name="blood_type"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Blood Type" fullWidth />
                )}
              />
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select {...field} label="Status">
                      {STATUS_OPTIONS.map((option: PatientStatus) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
              <Typography variant="subtitle2" color="text.secondary">
                Allergies
              </Typography>
              <AddableTextFieldList<EditPatientFormValues>
                control={control}
                name="allergies"
                addButtonLabel="Add allergy"
              />
              <Typography variant="subtitle2" color="text.secondary">
                Conditions
              </Typography>
              <AddableTextFieldList<EditPatientFormValues>
                control={control}
                name="conditions"
                addButtonLabel="Add condition"
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || isUpdating}
          >
            Save
          </Button>
        </DialogActions>
        {dialogError && <ErrorMessage message={dialogError} />}
      </form>
    </Dialog>
  );
};
