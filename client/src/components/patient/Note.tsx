import { useState } from 'react';
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

import { ConfirmationDialog } from '~/components';
import { useDeletePatientNote } from '~/hooks';
import { formatDate } from '~/utils';
import type { PatientNote } from '~/types';

type NoteProps = {
  note: PatientNote;
  patientId: string;
};

export const Note = ({ note, patientId }: NoteProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutate: deleteNote } = useDeletePatientNote(patientId);

  const handleDeleteNote = () => {
    deleteNote(note.id);
  };

  return (
    <>
      <Card>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack>
              <Typography variant="body1">{note.content}</Typography>
              <Typography variant="caption">
                {formatDate(note.created_at)}
              </Typography>
            </Stack>
            <IconButton
              sx={{ '&:hover': { color: 'error.main' } }}
              onClick={() => setConfirmOpen(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardContent>

        <ConfirmationDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDeleteNote}
        />
      </Card>
    </>
  );
};
