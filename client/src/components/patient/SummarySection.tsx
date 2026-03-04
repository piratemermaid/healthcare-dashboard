import { Stack, Typography } from '@mui/material';

type SummarySectionProps = {
  title: string;
  children: React.ReactNode;
};

export const SummarySection = ({ title, children }: SummarySectionProps) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant="subtitle2" fontWeight={600}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
};
