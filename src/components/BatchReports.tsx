import BatchReportHeadContainer from "./BatchReportHeader";
import BatchReportContainer from "./BatchReportContainer";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { useState } from "react";
import { BatchReport } from "../model/Report";

const BatchReports = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<BatchReport[]>([]);

  const getBatchReports = () => {
    try {
      const data = fetch(
        `http://localhost:8080/batch-reports/?identifier=${search}`
      )
        .then((res) => res.json())
        .then((res) => setData(res));

      } catch (error) {
        console.log(error);
      }

      setSearch("");
    };

  return (
    <div className="batch-report-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Party Number/CSID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={getBatchReports}>search</button>
      </div>
      {data?.length ? (
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table aria-label="simple table">
            <BatchReportHeadContainer />
            <TableBody>
              <BatchReportContainer batch={data} />
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="empty-container">
          <h2>Search by Party Number or CSID Number</h2>
        </div>
      )}
    </div>
  );
};

export default BatchReports;
