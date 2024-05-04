import { ReactNode, createContext, useState } from "react";
import { BatchReport } from "../model/Report";
import axiosInstance from "./axios";

export interface BatchReportProps {
  getBatchReports: (search: string) => void;
  data: BatchReport[];
}
export const BatchReportContext = createContext<BatchReportProps | undefined>(
  undefined
);

interface BatchProviderProps {
  children: ReactNode;
}

const BatchReportProvider = ({ children }: BatchProviderProps) => {
  const [data, setData] = useState<BatchReport[]>([]);

  const getBatchReports = async (search: string) => {
    try {
      const response = await axiosInstance.get(`batch-reports/?identifier=${search}`).then((res) => setData(res.data))
    } catch (error) {
      console.log();
    }
  };

  const contextValue = {
    getBatchReports,
    data,
  };

  return (
    <BatchReportContext.Provider value={contextValue}>
      {children}
    </BatchReportContext.Provider>
  );
};

export default BatchReportProvider;
