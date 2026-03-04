import { Card, CardContent, Typography } from '@mui/material';

import { formatDate } from '~/utils';
import type { PatientNote } from '~/types';

type NoteProps = {
  note: PatientNote;
};

export const Note = ({ note }: NoteProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="body1">{note.content}</Typography>
        <Typography variant="caption">{formatDate(note.created_at)}</Typography>
      </CardContent>
    </Card>
  );
};
