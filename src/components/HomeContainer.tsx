import {
  Paper,
  TableBody,
  TableContainer,
  Table,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TableHeadContainer from "./TableHead";
import { Batch } from "../model/JobModel";
import TableRowContainer from "./TableRow";

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
  return (
    <div className="table-container">
      <div className="import-jobs">
        <h2>Upstream Import Batches</h2>
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table aria-label="simple table">
            <TableHeadContainer />
            <TableBody>
              {importBatches.map((batch, index) => (
                <TableRowContainer batch={batch} key={index} modalOpenRequired={true}/>
              ))}
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
              {coreBatches.map((batch, index) => (
                <TableRowContainer batch={batch} key={index} modalOpenRequired={true}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HomeContainer;
