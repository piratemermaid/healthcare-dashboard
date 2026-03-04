import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

type AddNoteButtonProps = {
  onClick: () => void;
};

export const AddNoteButton = ({ onClick }: AddNoteButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={onClick}
    >
      Add Note
    </Button>
  );
};
