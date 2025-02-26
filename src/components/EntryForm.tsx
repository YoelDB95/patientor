import { Alert, Button, Input, InputLabel } from '@mui/material';
import React, { useState } from 'react';
import patientService from '../services/patients';
import { NewEntry, Patient } from '../types';
import axios from 'axios';

const EntryForm = ({
	id,
	patients,
	setPatients,
}: {
	id: string;
	patients: Patient[];
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}) => {
	const [description, setDescription] = useState<string>('');
	const [date, setDate] = useState<string>('');
	const [specialist, setSpecialist] = useState<string>('');
	const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
	const [diagnosisCodes, setDiagnosesCodes] = useState<string>('');
	const [error, setError] = useState<string>('');

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const newEntry: NewEntry = {
			description,
			date,
			specialist,
			healthCheckRating,
			type: 'HealthCheck',
			diagnosisCodes: diagnosisCodes.split(' '),
		};
		patientService
			.addEntry(id, newEntry)
			.then((data) => {
				setPatients(
					patients.map((patient) => (patient.id === id ? data : patient))
				);
				setDate('');
				setDescription('');
				setDiagnosesCodes('');
				setHealthCheckRating(0);
				setSpecialist('');
				setError('');
			})
			.catch((e: unknown) => {
				if (axios.isAxiosError(e)) {
					if (e?.response?.data && typeof e?.response?.data === 'string') {
						setError(e.response.data);
					}
				}
			});
	};

	return (
		<div style={{ border: '1px solid' }}>
			{error && <Alert severity='error'>{error}</Alert>}
			<h4>New HealthCheck entry</h4>
			<form onSubmit={handleSubmit}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<InputLabel>Description</InputLabel>{' '}
					<Input
						type='text'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<InputLabel>Date</InputLabel>
					<Input
						type='text'
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<InputLabel>Specialist</InputLabel>
					<Input
						type='text'
						value={specialist}
						onChange={(e) => setSpecialist(e.target.value)}
					/>
					<InputLabel>HealthCheck rating</InputLabel>
					<Input
						type='number'
						value={healthCheckRating}
						onChange={(e) => setHealthCheckRating(Number(e.target.value))}
					/>
					<InputLabel>Diagnosis codes(separate with spaces)</InputLabel>
					<Input
						type='text'
						value={diagnosisCodes}
						onChange={(e) => setDiagnosesCodes(e.target.value)}
					/>
				</div>
				<Button variant='contained' color='primary' type='submit'>
					Add
				</Button>
			</form>
		</div>
	);
};

export default EntryForm;
