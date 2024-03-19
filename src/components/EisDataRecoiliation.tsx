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
  "Stores without Fortellis Entity",
  "Stares without GL company ID",
  "Stores with more than one-A department",
  "Stones with missing franchise information",
  "Count of different types of stores in ES",
  "Count of Active DMS Boxes in EIS",
  "Count of Inactive DMS Boxes in EIS",
  "Total Departments present in EIS",
  "Total Departments mapped to stores",
  "Count of departments for which Dept Company ID is not matching in Ets and DMS stage",
];

const inputPlaceHolders = [
  "Enter party number/store I as input and retum all stores associated to that party",
  "Get all logons associated to a CMF (CMF as input)",
  "Get logon CMF when logon name and Cnumber is passed as input",
  "Retum all stores connected to a Crumber",
  "when Chumber is passed as input",
  "Get all franchisees in Brand OEM stage and in Els when store/party is passed as input",
];
const EisDataRecoiliation = () => {
  return (
    <div className="eis-data-container">
      <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableHeader.map((e, index) => (
              <TableRow key={index}>
                <TableCell>{e}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inputPlaceHolders.map((e, index) => (
              <TableRow>
                <TableCell>
                  <input type="text" name="" id="" placeholder={e} />
                </TableCell>
                <TableCell>
                  <button>search</button>
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
