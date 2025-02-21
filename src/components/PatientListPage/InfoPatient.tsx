import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../../services/patients';

const InfoPatient = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const id = useParams().id;

	useEffect(() => {
		if (typeof id === 'string')
			patientService.getPatient(id).then((res) => setPatient(res));
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
				{patient.entries.length > 0 && <p>entries</p>}
				{patient.entries.map((e) => {
					return (
						<div key={e.id}>
							<p>
								{e.date} {e.description}
							</p>
							<ul>
								{e.diagnosisCodes?.map((d) => (
									<li key={d}>{d}</li>
								))}
							</ul>
						</div>
					);
				})}
			</>
		);
	}

	return null;
};

export default InfoPatient;
