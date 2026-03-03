export type PatientStatus = 'active' | 'inactive' | 'pending' | 'discharged';

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  last_visit: Date | null;
  status: PatientStatus;
}
