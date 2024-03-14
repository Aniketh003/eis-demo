import { TableCell, TableRow, TableHead } from "@mui/material";

const BatchReportHeadContainer = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" sx={{ width: `${100 / 8}%` }}>
          Status
        </TableCell>
        <TableCell align="left" sx={{ width: `${100 / 8}%` }}>
          Created Date
        </TableCell>
        <TableCell align="left" sx={{ width: `${100 / 8}%` }}>
          Org Unit Type
        </TableCell>
        <TableCell align="left" sx={{ width: `${100 / 8}%` }}>
          Comments
        </TableCell>
        <TableCell align="left" sx={{ width: `${100 / 8}%` }}>
          Batch Name
        </TableCell>
        <TableCell align="left" sx={{ width: `${100 / 8}%` }}>
          Identifier Type
        </TableCell>
        <TableCell align="left" sx={{ width: `${100 / 8}%` }}>
          Created By
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default BatchReportHeadContainer;