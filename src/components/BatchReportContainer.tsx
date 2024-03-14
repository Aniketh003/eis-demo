import { TableCell, TableRow } from "@mui/material";
import { BatchReport } from "../model/Report";

interface BatchReportContainerProps {
  batch: BatchReport[] | null;
}

const BatchReportContainer = ({ batch }: BatchReportContainerProps) => {
  return (
    <>
      {batch?.map((report, index) => (
        <TableRow key={report.id}>
          <TableCell>{report.status}</TableCell>
          <TableCell>{report.createdDate}</TableCell>
          <TableCell>{report.orgUnitType}</TableCell>
          <TableCell>{report.comments}</TableCell>
          <TableCell>{report.batchName}</TableCell>
          <TableCell>{report.identifierType}</TableCell>
          <TableCell>{report.createdBy}</TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default BatchReportContainer;
