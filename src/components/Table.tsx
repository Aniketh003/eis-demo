import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";
import { useEffect, useState } from "react";
import RerunBtn from "./RerunBtn";
import ModalBtn from "./ModalBtn";
import ErrorBtn from "./ErrorBtn";
import { Link } from "react-router-dom";
import CompleteBadge from "./CompleteBadge";
import FailedBadge from "./FailedBadge";

export interface Batch {
  job_NAME: String;
  start_Time: String;
  status: String;
  end_Time: String;
  exit_Message: String;
}

const TableComponent = () => {
  const [importBatches, setImportBatches] = useState<Batch[]>([]);
  const [coreBatches, setCoreBatches] = useState<Batch[]>([]);

  const getExecutionTime = (start: string, end: string): string | null => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const hr = Math.abs(endTime.getHours() - startTime.getHours());
    const min = Math.abs(endTime.getMinutes() - startTime.getMinutes());
    const sec = Math.abs(endTime.getSeconds() - startTime.getSeconds());
    return `${hr > 12 ? hr : "0" + hr}:${min > 10 ? min : "0" + min}:${
      sec > 10 ? sec : "0" + sec
    }`;
  };

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
  return (
    <div className="table-container">
      <div className="import-jobs">
        <h2>Upstream Import Batches</h2>
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Batch Name</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Execution Time</TableCell>
                <TableCell align="left">Run Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {importBatches.map((e, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{e.job_NAME}</TableCell>
                  <TableCell align="left">{e.start_Time.substring(0,11)}</TableCell>
                  <TableCell align="left">
                    {e.start_Time && e.end_Time
                      ? getExecutionTime(e.start_Time, e.end_Time)
                      : "N/A"}
                  </TableCell>
                  <TableCell align="left">{e.status ? <CompleteBadge/> : <FailedBadge/>}</TableCell>
                  <TableCell align="left">
                    <div className="action-buttons">
                      {e.status === "FAILED" ? <RerunBtn /> : <></>}
                      {e.exit_Message ? <ErrorBtn /> : <></>}
                      <Link to={`/batch-jobs/data/${e.job_NAME}`}>
                        <ModalBtn />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="eis-core-jobs">
        <h2>EIS Core Batches</h2>
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Batch Name</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Execution Time</TableCell>
                <TableCell align="left">Run Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coreBatches.map((e, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{e.job_NAME}</TableCell>
                  <TableCell align="left">{e.start_Time.substring(0,11)}</TableCell>
                  <TableCell align="left">
                    {e.start_Time && e.end_Time
                      ? getExecutionTime(e.start_Time, e.end_Time)
                      : "N/A"}
                  </TableCell>
                  <TableCell align="left">{e.status ? <CompleteBadge/> : <FailedBadge/>}</TableCell>
                  <TableCell align="left">
                    <div className="action-buttons">
                      {e.status === "FAILED" ? <RerunBtn /> : <></>}
                      {e.exit_Message ? <ErrorBtn /> : <></>}
                      <Link to={`/batch-jobs/data/${e.job_NAME}`}>
                        <ModalBtn />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TableComponent;
