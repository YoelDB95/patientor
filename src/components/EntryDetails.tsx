/* eslint-disable no-mixed-spaces-and-tabs */
import { Diagnosis, Entry } from '../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';

const EntryDetails = ({
	entry,
	diagnoses,
}: {
	entry: Entry;
	diagnoses: Diagnosis[];
}) => {
	const entryDetailSwitch = () => {
		switch (entry.type) {
			case 'HealthCheck':
				return (
					<div>
						<p>
							{entry.date} <MedicalServicesIcon />
						</p>
						<p>{entry.description}</p>
						{entry.healthCheckRating === 0 ? (
							<FavoriteIcon color='success' />
						) : entry.healthCheckRating === 1 ||
						  entry.healthCheckRating === 2 ? (
							<FavoriteIcon color='warning' />
						) : (
							<FavoriteIcon color='error' />
						)}
						<p>diagnose by {entry.specialist}</p>
					</div>
				);
			case 'Hospital':
				return (
					<div>
						<p>
							{entry.date} <MedicalServicesIcon />
						</p>
						<p>{entry.description}</p>
						<p>diagnose by {entry.specialist}</p>
					</div>
				);

			case 'OccupationalHealthcare':
				return (
					<div>
						<p>
							{entry.date} <WorkIcon /> {entry.employerName}
						</p>
						<p>{entry.description}</p>
						<p>diagnose by {entry.specialist}</p>
					</div>
				);
		}
	};
	return (
		<div style={{ border: '1px solid', borderRadius: '5px' }}>
			{entryDetailSwitch()}
			<ul>
				{entry.diagnosisCodes?.map((d: string) => (
					<li key={d}>
						{d}: {diagnoses.filter((dia) => dia.code === d)[0].name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default EntryDetails;
