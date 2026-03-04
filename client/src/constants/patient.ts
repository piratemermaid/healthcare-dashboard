import type { PatientStatus } from '~/types';

export const STATUS_OPTIONS: PatientStatus[] = [
  'active',
  'inactive',
  'pending',
  'discharged',
];

export const BLOOD_TYPE_OPTIONS = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
] as const;
