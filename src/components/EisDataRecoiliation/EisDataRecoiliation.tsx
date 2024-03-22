import {
  Box,
  Modal,
  Paper,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";

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

const style = {
  position: "absolute" as "absolute",
  bottom: 20,
  right: 30,
  width: "fit-content",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const response =
  "AM-FI:76068005,AM-A:76068005,AM-I:76068005,GRV-FI:76068005,AM-SL:76068005,AM-CM:76068005,AM-S:76068005,AM-V:76068005,GRV-S:76068005,ACDB2:76068005,AM-P:76068005";
const EisDataRecoiliation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [checked, setChecked] = useState(false);

  const dataModal = response.split(",");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handlePopOverClose = () => {
    setAnchorEl(null);
    setChecked((prev) => !prev);
  };

  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
    setChecked((prev) => !prev);
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <div className="eis-data-container">
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
                <TableCell align="center"></TableCell>
                <TableCell align="center">
                  <button className="action-btn">Download Report</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
                  <input type="text" placeholder={e} />
                </TableCell>
                <TableCell>
                  <button className="action-btn" onClick={handlePopOverClick}>
                    search
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Modal
          open={open}
          onClose={handlePopOverClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Slide direction="left" in={checked}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {dataModal.map((e, index) => (
                  <p key={index}>{e}</p>
                ))}
              </Typography>
            </Box>
          </Slide>
        </Modal>
      </TableContainer>
    </div>
  );
};

export default EisDataRecoiliation;
