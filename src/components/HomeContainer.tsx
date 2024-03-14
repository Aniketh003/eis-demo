import {
  Paper,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
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

  const tableCountImportHeader = [
    "Finance Import Job",
    "DMS Stage Job",
    "Vision Job",
    "Brand Oem Import Job",
    "Bi Stage Import Job",
    "Vision CMF Number Job",
    "Finance Corp Import Job"
  ];

  const tableCountCoreHeader = [
    "Store Update Job",
    "Genarate Stores Job",
    "Generate Departments Job",
    "UpSert Enterprises Job"
  ];

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
        {/* <TableContainer component={Paper} sx={{width:"fit-content"}}>
          <TableHead>
            <TableRow>
              <TableCell>Batch</TableCell>
              {tableCountImportHeader.map((e) => (
                <TableCell >{e}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>count</TableCell>
              {tableCountImportHeader.map((e) => (
                <TableCell>{getImportJobCount(e)}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </TableContainer> */}
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table aria-label="simple table">
            <TableHeadContainer />
            <TableBody>
              <ImportRowContainer
                batch={importBatches}
                modalOpenRequired={true}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="eis-core-jobs">
        <h2>EIS Core Batches</h2>
        {/* <TableContainer component={Paper} sx={{width:"fit-content"}}>
          <TableHead>
            <TableRow>
              <TableCell>Batch</TableCell>
              {tableCountCoreHeader.map((e) => (
                <TableCell>{e}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>count</TableCell>
              {tableCountCoreHeader.map((e) => (
                <TableCell>{getEisJobCount(e)}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </TableContainer> */}
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table aria-label="simple table">
            <TableHeadContainer />
            <TableBody>
              <CoreRowContainer batch={coreBatches} modalOpenRequired={true} />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HomeContainer;
