import { TableCell, TableRow, TableHead } from "@mui/material";

const TableHeadContainer = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" sx={{ width: `${100 / 5}%`, height: "50px" }}>
          Batch Name
        </TableCell>
        <TableCell align="left" sx={{ width: `${100 / 5}%` }}>
          Date
        </TableCell>
        <TableCell align="left" sx={{ width: `${100 / 5}%` }}>
          Execution Time
        </TableCell>
        <TableCell align="left" sx={{ width: `${100 / 5}%` }}>
          Run Status
        </TableCell>
        <TableCell align="left" sx={{ width: `${100 / 5}%` }}>
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeadContainer;
