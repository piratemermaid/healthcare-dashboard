export type PatientStatus = 'active' | 'inactive' | 'pending' | 'discharged';

export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  age: number;
  last_visit: Date | null;
  status: PatientStatus;
  blood_type?: string | null;
  allergies?: string[];
  conditions?: string[];
}

export interface PatientListResponse {
  items: Patient[];
  total: number;
}

export interface PatientNote {
  id: number;
  content: string;
  created_at: string;
}

export interface PatientNoteListResponse {
  items: PatientNote[];
}

export interface PatientNoteCreate {
  content: string;
}

export interface PatientSummary {
  identifiers: {
    name: string;
    age: number;
    blood_type: string | null;
  };
  clinical: {
    conditions: string[];
    allergies: string[];
    status: PatientStatus;
  };
  narrative: string;
}
