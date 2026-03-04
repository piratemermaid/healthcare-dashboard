import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
} from '@mui/material';

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text?: string;
  confirmText?: string;
  cancelText?: string;
};

export const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  text = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ minWidth: 400 }}>
        <DialogContentText sx={{ color: 'text.primary' }}>
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          sx={{ p: 1 }}
        >
          <Button onClick={onClose}>{cancelText}</Button>
          <Button onClick={onConfirm} variant="contained">
            {confirmText}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
