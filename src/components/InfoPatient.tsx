import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import { Diagnosis, Entry } from '../types';
import EntryDetails from './EntryDetails';

const InfoPatient = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const id = useParams().id;

	useEffect(() => {
		if (typeof id === 'string')
			patientService.getPatient(id).then((res: Patient) => setPatient(res));
	}, [id]);

	if (patient) {
		return (
			<>
				<h3>
					{patient.name}{' '}
					{patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
				</h3>
				<p>ssn: {patient.ssn}</p>
				<p>occupation: {patient.occupation}</p>
				{patient.entries.length > 0 && <h4>entries</h4>}
				<div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
					{patient.entries.map((e: Entry) => {
						return <EntryDetails key={e.id} entry={e} diagnoses={diagnoses} />;
					})}
				</div>
			</>
		);
	}

	return null;
};

export default InfoPatient;
