import { Grid, Typography } from '@mui/material';

import { Note } from '~/components';
import type { PatientNote } from '~/types';

type PatientNoteListProps = {
  notes: PatientNote[];
};

export const PatientNoteList = ({ notes }: PatientNoteListProps) => {
  if (notes.length === 0) {
    return (
      <Typography variant="body1">This patient has no notes yet</Typography>
    );
  }

  return (
    <Grid container spacing={1}>
      {notes?.map((note) => (
        <Grid key={note.id} size={{ xs: 12, md: 6, lg: 4 }}>
          <Note note={note} />
        </Grid>
      ))}
    </Grid>
  );
};
