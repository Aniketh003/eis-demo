import { TableCell, TableRow, TableHead } from "@mui/material";

const TableHeadContainer = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" sx={{ height: "50px" }}>
          Batch Name
        </TableCell>
        <TableCell align="left">
          Date
        </TableCell>
        <TableCell align="left">
          Execution Time
        </TableCell>
        <TableCell align="left">
          Run Status
        </TableCell>
        <TableCell align="left">
          Action
        </TableCell>
        <TableCell align="left">
          Count
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadContainer;
