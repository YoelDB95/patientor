import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Patient } from '../types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import { Diagnosis, Entry } from '../types';
import EntryDetails from './EntryDetails';
import EntryForm from './EntryForm';

const InfoPatient = ({
	diagnoses,
	patients,
	setPatients,
}: {
	diagnoses: Diagnosis[];
	patients: Patient[];
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}) => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const id = useParams().id;

	useEffect(() => {
		if (typeof id === 'string')
			patientService.getPatient(id).then((res: Patient) => setPatient(res));
	}, [id, patients]);

	if (patient) {
		return (
			<>
				<h3>
					{patient.name}{' '}
					{patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
				</h3>
				<p>ssn: {patient.ssn}</p>
				<p>occupation: {patient.occupation}</p>
				{id !== undefined && (
					<EntryForm id={id} patients={patients} setPatients={setPatients} />
				)}
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
