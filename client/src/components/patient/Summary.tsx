import { Card, CardContent, Typography } from '@mui/material';

import type { PatientSummary } from '~/types';

type SummaryProps = {
  summary?: PatientSummary;
};

export const Summary = ({ summary }: SummaryProps) => {
  if (!summary) {
    return <Typography variant="body1">No summary available</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {summary.narrative}
        </Typography>
      </CardContent>
    </Card>
  );
};
