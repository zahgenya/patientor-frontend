import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Entry, Patient, Diagnosis } from "../../types";

interface Props {
  fetchSinglePatient: (id: string) => Promise<Patient>;
  fetchDiagnoses: () => Promise<Diagnosis[]>;
}

const PatientListPageById = ({ fetchSinglePatient, fetchDiagnoses }: Props) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const fetchedPatient = await fetchSinglePatient(id);
        const fetchedDiagnoses = await fetchDiagnoses();
        setDiagnoses(fetchedDiagnoses);
        setPatient(fetchedPatient);
      }
    };
    void fetchData();
  }, [id, fetchSinglePatient, fetchDiagnoses]);
console.log(diagnoses)
  const renderEntry = (entry: Entry) => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <div key={entry.id}>
            <p>Date: {entry.date}</p>
            <p>Description: {entry.description}</p>
            <p>Specialist: {entry.specialist}</p>
            <ul>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code) => {
                  const diagnosis = diagnoses?.find((d) => d.code === code);
                  return (
                  <li key={code}>
                    {code} {diagnosis?.name}
                  </li>
                  )
                })}
            </ul>
          </div>
        );
      case "Hospital":
        return (
          <div key={entry.id}>
            <p>Date: {entry.date}</p>
            <p>Description: {entry.description}</p>
            <p>Specialist: {entry.specialist}</p>
            <p>Discharge date: {entry.discharge.date}</p>
            <p>Discharge criteria: {entry.discharge.criteria}</p>
            <ul>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code) => {
                  const diagnosis = diagnoses?.find((d) => d.code === code);
                  return (
                  <li key={code}>
                    {code} {diagnosis?.name}
                  </li>
                  )
                })}
            </ul>
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div key={entry.id}>
            <p>Date: {entry.date}</p>
            <p>Description: {entry.description}</p>
            <p>Specialist: {entry.specialist}</p>
            <p>Employer: {entry.employerName}</p>
            <ul>
              {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((code) => {
                  const diagnosis = diagnoses?.find((d) => d.code === code);
                  return (
                  <li key={code}>
                    {code} {diagnosis?.name}
                  </li>
                  )
                })}
            </ul>
          </div>
        );
      default:
        return <div>No available entries</div>;
    }
  };

  return (
    <div className="App">
      {patient ? (
        <>
          <h2>
            {patient.name} {patient.gender}
          </h2>
          <>
            <p>ssn: {patient.ssn}</p>
          </>
          <>
            <p>occupation: {patient.occupation}</p>
          </>
          <h2>Entries</h2>
          {patient.entries.length > 0 ? (
            patient.entries.map(renderEntry)
          ) : (
            <p>No entries available.</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientListPageById;
