import BatchReportHeadContainer from "./BatchReportHeader";
import BatchReportContainer from "./BatchReportContainer";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { useContext, useState } from "react";
import { BatchReportContext } from "../context/BatchReportProvider";

const BatchReports = () => {
  const batchReportContext = useContext(BatchReportContext);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("Search by Party Number or CSID Number");

  const getBatchReports = () => {
    if (search !== "") {
      batchReportContext?.getBatchReports(search);
    }

    if (batchReportContext?.data.length === 0) {
      setError("No data found");
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
        <button onClick={() => getBatchReports()}>search</button>
      </div>
      {batchReportContext?.data?.length ? (
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table aria-label="simple table">
            <BatchReportHeadContainer />
            <TableBody>
              <BatchReportContainer batch={batchReportContext?.data} />
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="empty-container">
          <h2>{error}</h2>
        </div>
      )}
    </div>
  );
};

export default BatchReports;
