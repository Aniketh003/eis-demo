import { ReactNode, createContext, useState } from "react";
import { Batch } from "../model/JobModel";

interface JobDataProps {
  handleRerunData: (executionId: string) => void;
  dataChange: boolean;
  setDataChange: React.Dispatch<React.SetStateAction<boolean>>;
  importBatches: Batch[];
  coreBatches: Batch[];
  fetchImportBatches: () => Batch[];
  fetchCoreBatches: () => Batch[];
}

export const JobContext = createContext<JobDataProps>();

interface JobProviderProps {
  children: ReactNode;
}

const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [dataChange, setDataChange] = useState(false);
  const [importBatches, setImportBatches] = useState<Batch[]>([]);
  const [coreBatches, setCoreBatches] = useState<Batch[]>([]);

  const fetchImportBatches = () => {
    const data = fetch("http://localhost:8080/batch-jobs/import-jobs")
      .then((res) => res.json())
      .then((res) => setImportBatches(res));
    console.log("Fetched");
    return importBatches;
  };

  const fetchCoreBatches = () => {
    const data = fetch("http://localhost:8080/batch-jobs/core-jobs")
      .then((res) => res.json())
      .then((res) => setCoreBatches(res));

    return coreBatches;
  };

  const handleRerunData = (executionId: string) => {
    fetch(`http://localhost:8080/batch-jobs/rerun?exeId=${executionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exeId: executionId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res;
      })
      .then((data) => {
        console.log("Response:", data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const contextValue: JobDataProps = {
    handleRerunData,
    setDataChange,
    dataChange,
    importBatches,
    coreBatches,
    fetchCoreBatches,
    fetchImportBatches,
  };

  return (
    <JobContext.Provider value={contextValue}>{children}</JobContext.Provider>
  );
};

export default JobProvider;
