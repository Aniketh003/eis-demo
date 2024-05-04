import BatchReportHeadContainer from "./BatchReportHeader";
import BatchReportContainer from "./BatchReportContainer";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { useContext, useState } from "react";
import { BatchReportContext } from "../../context/BatchReportProvider";

const BatchReports = () => {
  const { getBatchReports, data } = useContext(BatchReportContext);
  const [search, setSearch] = useState("");
  const [resData, setResData] = useState([])
  const [error, setError] = useState("Search by Party Number or CSID Number");

  const handleSearch = async () => {
    if (search) {
      await getBatchReports(search);
      setResData(data)
      console.log(resData)
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
        <button onClick={handleSearch}>search</button>
      </div>
      {data.length ? (
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
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default BatchReports;
