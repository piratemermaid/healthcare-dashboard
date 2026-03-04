import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

import { ErrorMessage } from '~/components';

type AddNoteDialogProps = {
  open: boolean;
  onClose: () => void;
  onAddNote: (content: string) => void;
  isLoading: boolean;
  error: string;
};

export const AddNoteDialog = ({
  open,
  onClose,
  onAddNote,
  isLoading,
  error,
}: AddNoteDialogProps) => {
  const [content, setContent] = useState('');
  const [dialogError, setDialogError] = useState(error);

  const handleAddNote = () => {
    onAddNote(content);
    setContent('');
    setDialogError('');
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    setDialogError('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Note</DialogTitle>
      <DialogContent sx={{ minWidth: 400 }}>
        <TextField
          label="Note"
          fullWidth
          multiline
          rows={8}
          value={content}
          onChange={handleContentChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleAddNote}
          disabled={!content.length}
          loading={isLoading}
        >
          Add
        </Button>
      </DialogActions>
      {dialogError && <ErrorMessage message={dialogError} />}
    </Dialog>
  );
};
