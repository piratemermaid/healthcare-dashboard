import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useParams } from '@tanstack/react-router';

import {
  ErrorMessage,
  Loader,
  PatientStatusChip,
  PatientNoteList,
  AddNoteButton,
  AddNoteDialog,
} from '~/components';
import { usePatient, usePatientNotes, useAddPatientNote } from '~/hooks';
import { formatDate, getFullName } from '~/utils';

export function PatientPage() {
  const [addNoteDialogOpen, setAddNoteDialogOpen] = useState(false);

  const { id } = useParams({ from: '/patients/$id' });

  const {
    data: patient,
    isLoading: isPatientLoading,
    error: patientError,
  } = usePatient(id);
  const {
    data: notes,
    isLoading: isNotesLoading,
    error: notesError,
  } = usePatientNotes(id);

  const {
    mutate: addNote,
    isPending: isAddingNote,
    error: addNoteError,
  } = useAddPatientNote(id);

  const handleAddNote = (content: string) => {
    addNote(
      { content },
      {
        onSuccess: () => {
          setAddNoteDialogOpen(false);
        },
      }
    );
  };

  if (patientError || notesError) {
    return (
      <ErrorMessage
        message={
          patientError?.message ??
          notesError?.message ??
          'Oopsie, something went wrong!'
        }
      />
    );
  }

  if (isPatientLoading || isNotesLoading) {
    return <Loader />;
  }

  if (!patient) {
    return <ErrorMessage message="Patient not found" />;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h5">
        {getFullName(patient.first_name, patient.last_name)}
      </Typography>
      <Stack>
        <Typography variant="body1">Age: {patient.age}</Typography>
        <Typography variant="body1">
          Last visit: {formatDate(patient.last_visit, 'MM/dd/yyyy')}
        </Typography>
        <Typography variant="body1">
          Status: <PatientStatusChip status={patient.status} />
        </Typography>
      </Stack>

      <Stack spacing={1}>
        <Typography variant="h6">Summary</Typography>
        <Typography>summary</Typography>
      </Stack>

      <Stack spacing={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Notes</Typography>
          <AddNoteButton onClick={() => setAddNoteDialogOpen(true)} />
        </Stack>
        <PatientNoteList patientId={id} notes={notes?.items ?? []} />
      </Stack>

      <AddNoteDialog
        open={addNoteDialogOpen}
        onClose={() => setAddNoteDialogOpen(false)}
        onAddNote={handleAddNote}
        isLoading={isAddingNote}
        error={addNoteError?.message ?? 'Failed to add note'}
      />
    </Stack>
  );
}
