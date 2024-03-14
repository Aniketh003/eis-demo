import {
  Paper,
  TableBody,
  TableContainer,
  Table
} from "@mui/material";
import { useEffect, useState } from "react";
import TableHeadContainer from "./TableHead";
import { Batch } from "../model/JobModel";
import ImportRowContainer from "./ImportRowContainer";
import CoreRowContainer from "./CoreRowContainer";

const HomeContainer = () => {
  const [importBatches, setImportBatches] = useState<Batch[]>([]);
  const [coreBatches, setCoreBatches] = useState<Batch[]>([]);

  useEffect(() => {
    const data = fetch("http://localhost:8080/batch-jobs/import-jobs")
      .then((res) => res.json())
      .then((res) => setImportBatches(res));
  }, []);

  useEffect(() => {
    const data = fetch("http://localhost:8080/batch-jobs/core-jobs")
      .then((res) => res.json())
      .then((res) => setCoreBatches(res));
  }, []);

  const getImportJobCount = (jobName: string) => {
    let count = 0;
    importBatches.forEach((e) => {
      if (
        e.job_NAME.toLowerCase() === jobName.toLowerCase().replace(/\s/g, "")
      ) {
        count++;
      }
    });
    return count;
  };

  const getEisJobCount = (jobName: string) => {
    let count = 0;
    coreBatches.forEach((e) => {
      if (
        e.job_NAME.toLowerCase() === jobName.toLowerCase().replace(/\s/g, "")
      ) {
        count++;
      }
    });

    return count;
  };

  return (
    <div className="table-container">
      <div className="import-jobs">
        <h2>Upstream Import Batches</h2>
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table aria-label="simple table">
            <TableHeadContainer />
            <TableBody>
              <ImportRowContainer
                batch={importBatches}
                modalOpenRequired={true}
                getImportJobCount={getImportJobCount}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="eis-core-jobs">
        <h2>EIS Core Batches</h2>
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table aria-label="simple table">
            <TableHeadContainer />
            <TableBody>
              <CoreRowContainer batch={coreBatches} modalOpenRequired={true} getEisJobCount={getEisJobCount}/>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HomeContainer;
