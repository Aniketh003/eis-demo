import { Popover, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { BatchReport } from "../../model/Report";
import BatchReportStatusButtons from "./BatchReportStatusButtons";

interface BatchReportContainerProps {
  batch: BatchReport[] | null;
}

const BatchReportContainer = ({ batch }: BatchReportContainerProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReport, setSelectedReport] = useState<BatchReport | null>(null);

  const handlePopOverClick = (event, report: BatchReport) => {
    setAnchorEl(event.currentTarget);
    setSelectedReport(report);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
    setSelectedReport(null);
  };

  return (
    <>
      {batch?.map((report) => (
        <TableRow key={report.id}>
          <TableCell>{report.identifierValue}</TableCell>
          <TableCell>{report.identifierType}</TableCell>
          <TableCell>{report.createdBy}</TableCell>
          <TableCell>{report.createdDate.substring(0, 11)}</TableCell>
          <TableCell>{report.batchName ? report.batchName : "-- --"}</TableCell>
          <TableCell>{report.orgUnitType}</TableCell>
          <TableCell><BatchReportStatusButtons status={report.status}/></TableCell>
          <TableCell>
            <button onClick={(event) => handlePopOverClick(event, report)}className="batch-report-row-button">view</button>
          </TableCell>
          <Popover
            open={selectedReport?.id === report.id}
            anchorEl={anchorEl}
            onClose={handlePopOverClose}
            anchorOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{ elevation: 0 }}
          >
            <Typography
              sx={{
                padding: "20px",
                border: "1px solid #bcbcbc",
                borderRadius: "8px",
              }}
            >
              <div className="closeBtn">
                <button onClick={handlePopOverClose}>Close</button>
              </div>
              {report.comments}
            </Typography>
          </Popover>
        </TableRow>
      ))}
    </>
  );
};

export default BatchReportContainer;
