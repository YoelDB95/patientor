import {
	Alert,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	Input,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
} from '@mui/material';
import React, { useState } from 'react';
import patientService from '../services/patients';
import {
	Discharge,
	HealthCheckRating,
	NewEntry,
	Patient,
	SickLeave,
} from '../types';
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
	const [diagnosisCodes, setDiagnosesCodes] = useState<string>('');
	const [type, setType] = useState<string>('Hospital');
	const [discharge, setDischarge] = useState<Discharge>({
		date: '',
		criteria: '',
	});
	const [healthCheckRating, setHealthCheckRating] =
		useState<HealthCheckRating>(0);
	const [employerName, setEmployerName] = useState<string>('');
	const [sickLeave, setSickLeave] = useState<SickLeave>({
		startDate: '',
		endDate: '',
	});
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
				setDischarge({
					date: '',
					criteria: '',
				});
				setEmployerName('');
				setSickLeave({
					startDate: '',
					endDate: '',
				});
				setType('Hospital');
			})
			.catch((e: unknown) => {
				if (axios.isAxiosError(e)) {
					if (e?.response?.data && typeof e?.response?.data === 'string') {
						setError(e.response.data);
					}
				}
			});
	};

	const switchRender = () => {
		switch (type) {
			case 'Hospital':
				return (
					<>
						<InputLabel>Discharge</InputLabel>
						<div>
							<InputLabel>Date</InputLabel>
							<Input
								type='date'
								value={discharge.date}
								onChange={(e) =>
									setDischarge({ ...discharge, date: e.target.value })
								}
							/>
						</div>
						<div>
							<InputLabel>Criteria</InputLabel>
							<Input
								type='text'
								value={discharge.criteria}
								onChange={(e) =>
									setDischarge({ ...discharge, criteria: e.target.value })
								}
							/>
						</div>
					</>
				);
			case 'HealthCheck':
				return (
					<div>
						<InputLabel>HealthCheck rating</InputLabel>
						<Select
							value={healthCheckRating}
							onChange={(e) => setHealthCheckRating(Number(e.target.value))}
						>
							<MenuItem value={0}>0</MenuItem>
							<MenuItem value={1}>1</MenuItem>
							<MenuItem value={2}>2</MenuItem>
							<MenuItem value={3}>3</MenuItem>
						</Select>
					</div>
				);
			case 'OccupationalHealthcare':
				return (
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<InputLabel>Employer name</InputLabel>{' '}
						<Input
							type='text'
							value={employerName}
							onChange={(e) => setEmployerName(e.target.value)}
						/>
						<InputLabel>Sick leave</InputLabel>{' '}
						<InputLabel>Start date</InputLabel>
						<Input
							type='date'
							value={sickLeave.startDate}
							onChange={(e) =>
								setSickLeave({ ...sickLeave, startDate: e.target.value })
							}
						/>
						<InputLabel>End date</InputLabel>
						<Input
							type='date'
							value={sickLeave.endDate}
							onChange={(e) =>
								setSickLeave({ ...sickLeave, endDate: e.target.value })
							}
						/>
					</div>
				);
		}
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
						type='date'
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<InputLabel>Specialist</InputLabel>
					<Input
						type='text'
						value={specialist}
						onChange={(e) => setSpecialist(e.target.value)}
					/>
					<InputLabel>Diagnosis codes(separate with spaces)</InputLabel>
					<Input
						type='text'
						value={diagnosisCodes}
						onChange={(e) => setDiagnosesCodes(e.target.value)}
					/>
					<FormControl>
						<FormLabel id='demo-radio-buttons-group-label'>Type</FormLabel>
						<RadioGroup
							aria-labelledby='demo-radio-buttons-group-label'
							name='radio-buttons-group'
							value={type}
							onChange={(e) => setType(e.target.value)}
						>
							<FormControlLabel
								value='Hospital'
								control={<Radio />}
								label='Hospital'
							/>
							<FormControlLabel
								value='OccupationalHealthcare'
								control={<Radio />}
								label='OccupationalHealthcare'
							/>
							<FormControlLabel
								value='HealthCheck'
								control={<Radio />}
								label='HealthCheck'
							/>
						</RadioGroup>
					</FormControl>
				</div>
				{switchRender()}
				<Button variant='contained' color='primary' type='submit'>
					Add
				</Button>
			</form>
		</div>
	);
};

export default EntryForm;
