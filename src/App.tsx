import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Patient, Diagnosis } from './types';

import patientService from './services/patients';
import diagnoseService from './services/diagnoses';

import PatientListPage from './components/PatientListPage';
import InfoPatient from './components/InfoPatient';

const App = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

	useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);

		const fetchPatientList = async () => {
			const patients = await patientService.getAll();
			setPatients(patients);
		};
		void fetchPatientList();

		const fetchDiagnoseList = async () => {
			const diagnosis = await diagnoseService.getAll();
			setDiagnosis(diagnosis);
		};

		fetchDiagnoseList();
	}, []);

	return (
		<div className='App'>
			<Router>
				<Container>
					<Typography variant='h3' style={{ marginBottom: '0.5em' }}>
						Patientor
					</Typography>
					<Button component={Link} to='/' variant='contained' color='primary'>
						Home
					</Button>
					<Divider hidden />
					<Routes>
						<Route
							path='/'
							element={
								<PatientListPage
									patients={patients}
									setPatients={setPatients}
								/>
							}
						/>
						<Route
							path='/patients/:id'
							element={
								<InfoPatient
									patients={patients}
									setPatients={setPatients}
									diagnoses={diagnosis}
								/>
							}
						/>
					</Routes>
				</Container>
			</Router>
		</div>
	);
};

export default App;
