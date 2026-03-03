import { Alert } from '@mui/material';

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <Alert severity="error">{message}</Alert>;
};
