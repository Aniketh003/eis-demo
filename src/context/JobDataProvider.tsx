import { ReactNode, createContext, useState } from "react";
import axiosInstance from "./axios";
import { Batch } from "../model/JobModel";

interface JobDataProps {
  handleRerunData: (executionId: string) => void;
  dataChange: boolean;
  setDataChange: React.Dispatch<React.SetStateAction<boolean>>;
  importBatches: Batch[];
  coreBatches: Batch[];
  fetchImportBatches: () => Promise<Batch[]>;
  fetchCoreBatches: () => Promise<Batch[]>;
}

export const JobContext = createContext<JobDataProps>({
  handleRerunData: () => {},
  dataChange: false,
  setDataChange: () => {},
  importBatches: [],
  coreBatches: [],
  fetchImportBatches: async () => [],
  fetchCoreBatches: async () => [],
});

interface JobProviderProps {
  children: ReactNode;
}

const JobProvider: React.FC<JobProviderProps> = ({ children }) => {
  const [dataChange, setDataChange] = useState(false);
  const [importBatches, setImportBatches] = useState<Batch[]>([]);
  const [coreBatches, setCoreBatches] = useState<Batch[]>([]);

  const fetchImportBatches = async () => {
    try {
      const response = await axiosInstance.get("/batch-jobs/import-jobs");
      setImportBatches(response.data);
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const fetchCoreBatches = async () => {
    try {
      const response = await axiosInstance.get("/batch-jobs/core-jobs");
      setCoreBatches(response.data);
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const handleRerunData = async (executionId: string) => {
    try {
      const response = await axiosInstance.post("/batch-jobs/rerun", {
        exeId: executionId,
      });
    } catch (error) {
    }
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
