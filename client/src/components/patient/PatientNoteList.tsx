import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import type { PatientNote } from '~/types';
import { formatDate } from '~/utils';

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
          <Card>
            <CardContent>
              <Typography variant="body1">{note.content}</Typography>
              <Typography variant="caption">
                {formatDate(note.created_at)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
