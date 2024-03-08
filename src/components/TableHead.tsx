import { TableCell, TableRow,TableHead } from "@mui/material";

const TableHeadContainer = () => {
  return (
    <div>
      <TableHead>
        <TableRow>
          <TableCell align="left">Batch Name</TableCell>
          <TableCell align="left">Date</TableCell>
          <TableCell align="left">Execution Time</TableCell>
          <TableCell align="left">Run Status</TableCell>
          <TableCell align="left">Action</TableCell>
        </TableRow>
      </TableHead>
    </div>
  );
};

export default TableHeadContainer;
