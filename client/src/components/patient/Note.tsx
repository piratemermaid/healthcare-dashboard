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
import { formatDate } from '~/utils';
import type { PatientNote } from '~/types';

type NoteProps = {
  note: PatientNote;
};

export const Note = ({ note }: NoteProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteNote = () => {
    alert('delete!');
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
