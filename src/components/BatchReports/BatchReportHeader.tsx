import { TableCell, TableRow, TableHead } from "@mui/material";

const BatchReportHeadContainer = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Identifier Value</TableCell>
        <TableCell>Identifier Type</TableCell>
        <TableCell>Created By</TableCell>
        <TableCell>Created Date</TableCell>
        <TableCell>Batch Name</TableCell>
        <TableCell>Org Unit Type</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Comments</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default BatchReportHeadContainer;