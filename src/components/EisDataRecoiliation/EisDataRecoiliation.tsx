import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
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
  { title: "Stores by partynumber/store id", placeholder: "Get all stores by partynumber/store id" },
  { title: "Logons associated to a CMF by CMF number", placeholder: "Get all logons associated to a CMF by CMF number" },
  { title: "CMF by logon name and Cnumber", placeholder: "Get logon CMF by logon name and Cnumber" },
  { title: "Stores connected by Cnumber", placeholder: "Return all stores connected by Cnumber" },
  { title: "Franchisees in Brand OEM stage/EIS by storeId/partyNumber", placeholder: "Get all franchisees in Brand OEM stage/EIS by storeId/partyNumber" },
];

const response =
  "AM-FI:76068005,AM-A:76068005,AM-I:76068005,GRV-FI:76068005,AM-SL:76068005,AM-CM:76068005,AM-S:76068005,AM-V:76068005,GRV-S:76068005,ACDB2:76068005,AM-P:76068005";

const EisDataRecoiliation = () => {
  const theme = useTheme();
  const [inputValues, setInputValues] = useState(Array(inputPlaceHolders.length).fill(""));
  const [text,setText]  = useState("");
  const [result, setResult] = useState("");
  const [resultTitle, setResultTitle] = useState("");

  const handleInputChange = (index:number, value:string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  const setResultResponse = (title:string, result:string, index:number) => {
    setResult(result);
    setResultTitle(title);
    setText(inputValues[index]);
  };

  return (
    <div className="eis-data-container">
      <div className="count-table">
        <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "65%" }}>Description</TableCell>
                <TableCell align="center">Count</TableCell>
                <TableCell align="center" sx={{ width: "25%" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableHeader.map((e, index) => (
                <TableRow key={index}>
                  <TableCell>{e}</TableCell>
                  <TableCell align="center">0</TableCell>
                  <TableCell align="center">
                    <button className="action-btn">Download Report</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="right-container">
        <TableContainer
          component={Paper}
          style={{ borderRadius: "10px", height: "fit-content" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "80%" }}>Description</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inputPlaceHolders.map((e, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <input 
                      type="text" 
                      placeholder={e.placeholder} 
                      value={inputValues[index]} 
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <button
                      className="action-btn"
                      onClick={() => setResultResponse(e.title, response, index)}
                    >
                      Search
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {result && (
          <div className={`result-container ${theme.palette.mode === "dark" && "dark"}`}>
            <div className="close-btn">
              <button onClick={() => setResult("")}>X</button>
            </div>
            <h3>{resultTitle} : {text}</h3>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EisDataRecoiliation;
