import { ReactNode, createContext, useState } from "react";
import { BatchReport } from "../model/Report";

interface BatchReportProps {
  getBatchReports: (search: string) => void;
  data:BatchReport[]
}
export const BatchReportContext = createContext<BatchReportProps | undefined>(
  undefined
);

interface BatchProviderProps {
  children: ReactNode;
}

const BatchReportProvider = ({ children }: BatchProviderProps) => {
  const [data, setData] = useState<BatchReport[]>([]);
  const getBatchReports = (search: string) => {
    try {
      const data = fetch(
        `http://localhost:8080/batch-reports/?identifier=${search}`
      )
        .then((res) => res.json())
        .then((res) => setData(res));
    } catch (error) {
      console.log(error);
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
