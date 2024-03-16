import { Popover, TableCell, TableRow, Typography } from "@mui/material";
import CompleteBadge from "./CompleteBadge";
import FailedBadge from "./FailedBadge";
import { Batch } from "../model/JobModel";
import { useContext, useState } from "react";
import RunningBadge from "./RunningBadge";
import { JobContext } from "../context/JobDataProvider";

interface TableRowContainerProps {
  batch: Batch;
  modalOpenRequired: boolean;
}

function ModalRowContainer({
  batch,
}: TableRowContainerProps) {
  const jobContext = useContext(JobContext)

  const [anchorEl, setAnchorEl] = useState(null);
  const { job_NAME, start_Time, status, end_Time, exit_Message , execution_Id } = batch;

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getExecutionTime = (start: string, end: string): string | null => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const hr = Math.abs(endTime.getHours() - startTime.getHours());
    const min = Math.abs(endTime.getMinutes() - startTime.getMinutes());
    const sec = Math.abs(endTime.getSeconds() - startTime.getSeconds());
    return `${hr > 12 ? hr : "0" + hr}:${min > 10 ? min : "0" + min}:${
      sec > 10 ? sec : "0" + sec
    }`;
  };

  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = () => {
    jobContext?.handleRerunData(execution_Id.toString())
    jobContext?.setDataChange(true)
  }

  const getJobName = (jobName:string) => {
    switch(jobName){
      case "financeImportJob" : return "Finance Import Job"
      case 'visionJob':return "Vision Job"
      case "dmsStageJob":return "DMS Stage Job"
      case "visionCmfNumberJob":return "Vision CMF Store Job"
      case "eisDmsServerJob":return "Eis DMS Server Job"
      case "storeUpdateJob":return "Store Update Job"
      case "financeCorpImportJob":return "Finance Corp Import Job"
      case "brandOemImportJob":return "Brand Oem Import Job"
      case "biStageImportJob" : return "Bi Stage Import Job"
      case "upSertEnterprisesJob" : return "UpSert Enterprises Job"
      case "generateDepartmentsJob":return "Generate Departments Job"
      case "generateStoresJob" : return "Generate Stores Job"
    }
  }

  return (
    <TableRow  style={{ cursor: "pointer" }}>
      <TableCell>{getJobName(job_NAME)}</TableCell>
      <TableCell>{start_Time.substring(0, 11)}</TableCell>
      <TableCell>
        {start_Time && end_Time
          ? getExecutionTime(start_Time, end_Time)
          : "N/A"}
      </TableCell>
      <TableCell>
        {status === "COMPLETED" ? <CompleteBadge /> : status === "RUNNING" ? <RunningBadge/> : <FailedBadge/>}
      </TableCell>
      <TableCell>
        <div className="action-buttons">
          <button
            className={`action-btn ${(status === "COMPLETED" || status === "RUNNING") && "disabled"}`}
            disabled={status === "COMPLETED" || status === "RUNNING"}
            onClick={handleStatusChange}
          >
            Rerun
          </button>
          <button
            onClick={handlePopOverClick}
            disabled={status === "COMPLETED"}
            className={`action-btn ${status === "COMPLETED" && "disabled"}`}
          >
            Reason
          </button>
        </div>
      </TableCell>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
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
          {exit_Message}
        </Typography>
      </Popover>
    </TableRow>
  );
}

export default ModalRowContainer;
