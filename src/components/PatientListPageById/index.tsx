import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import { TableRow, TableCell } from "@mui/material";

interface Props {
  fetchSinglePatient: (id: string) => Promise<Patient>;
}

const PatientListPageById = ({ fetchSinglePatient } : Props) => {
  const { id } = useParams()
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
      const fetchedPatient = await fetchSinglePatient(id);
      setPatient(fetchedPatient);
    };
    }
    void fetchData()
  }, [id, fetchSinglePatient])

  return (
    <div className="App">
    <TableRow>
      <TableCell>{patient?.name}</TableCell>
      <TableCell>{patient?.gender}</TableCell>
    </TableRow>
    </div>
  );
};

export default PatientListPageById;