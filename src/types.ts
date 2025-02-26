export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

export interface Discharge {
	date: string;
	criteria: string;
}

interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: Discharge;
}

export interface SickLeave {
	startDate: string;
	endDate: string;
}

interface OccupationalHealthCareEntry extends BaseEntry {
	employerName: string;
	type: 'OccupationalHealthcare';
	sickLeave?: SickLeave;
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthCareEntry
	| HealthCheckEntry;

export type Patient = {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
};

export type PatientFormValues = Omit<Patient, 'id'>;

// Define omit especial para uniones
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;
// Define Entry sin la propiedad 'id'
export type NewEntry = UnionOmit<Entry, 'id'>;
