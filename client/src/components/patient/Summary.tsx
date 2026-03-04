import { Card, CardContent, Stack, Typography } from '@mui/material';

import { SummarySection } from '~/components';
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
        <Stack spacing={2}>
          <SummarySection title="Identifiers">
            <Stack>
              <Typography variant="body1">
                Name: {summary.identifiers.name}
              </Typography>
              <Typography variant="body1">
                Age: {summary.identifiers.age}
              </Typography>
              <Typography variant="body1">
                Blood Type: {summary.identifiers.blood_type ?? 'N/A'}
              </Typography>
            </Stack>
          </SummarySection>
          <SummarySection title="Clinical">
            <Stack>
              <Typography variant="body1">
                Conditions:{' '}
                {summary.clinical.conditions.length
                  ? summary.clinical.conditions.join(', ')
                  : 'None noted'}
              </Typography>
              <Typography variant="body1">
                Allergies:{' '}
                {summary.clinical.allergies.length
                  ? summary.clinical.allergies.join(', ')
                  : 'None noted'}
              </Typography>
            </Stack>
          </SummarySection>
          <SummarySection title="Narrative">
            <Typography variant="body1">{summary.narrative}</Typography>
          </SummarySection>
        </Stack>
      </CardContent>
    </Card>
  );
};
