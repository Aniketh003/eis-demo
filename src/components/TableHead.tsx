import { TableCell, TableRow, TableHead } from "@mui/material";

const TableHeadContainer = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" sx={{ height: "50px" }}>
          Batch Name
        </TableCell>
        <TableCell align="left" sx={{ }}>
          Date
        </TableCell>
        <TableCell align="left" sx={{ }}>
          Execution Time
        </TableCell>
        <TableCell align="left" sx={{ }}>
          Run Status
        </TableCell>
        <TableCell align="left" sx={{ }}>
          Action
        </TableCell>
        <TableCell align="left" sx={{ }}>
          Count
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadContainer;
