import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const tableHeader = [
  "CMF count in EIS and CMF count in Finance stage",
  "CMF and store matching in EIS vs mapping in finance",
  "Missing Active Parties in EIS",
  "Consolidation IDs missing in EIS",
  "Stores without Fortellis Entity ID",
  "Stores without GL company ID",
  "Stores with more than one-A department",
  "Stores with missing franchise information",
  "Count of different types of stores in EIS",
  "Count of Active DMS Boxes in EIS",
  "Count of Inactive DMS Boxes in EIS",
  "Total Departments present in EIS",
  "Total Departments mapped to stores",
  "Count of departments for which Dept Company ID is not matching in EIS and DMS stage",
];

const inputPlaceHolders = [
  "Get all stores by partynumber/store id",
  "Get all logons associated to a CMF by CMF number",
  "Get logon CMF by logon name and Cnumber",
  "Return all stores connected by Cnumber",
  "Get all franchisees in Brand OEM stage/EIS by storeId/partyNumber",
];
const EisDataRecoiliation = () => {
  return (
    <div className="eis-data-container">
      <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{width:"75%"}}>Description</TableCell>
              <TableCell align="center">Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableHeader.map((e, index) => (
              <TableRow key={index}>
                <TableCell>{e}</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} style={{ borderRadius: "10px" , height:"fit-content"}}>
        <Table aria-label="simple table">
          <TableHead >
            <TableRow>
              <TableCell sx={{width:"80%"}}>Description</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inputPlaceHolders.map((e, index) => (
              <TableRow>
                <TableCell>
                  <input type="text" placeholder={e} />
                </TableCell>
                <TableCell>
                  <button className="action-btn">search</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EisDataRecoiliation;
