import {
  IconButton,
  Popover,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import CompleteBadge from "./CompleteBadge";
import FailedBadge from "./FailedBadge";
import { Batch } from "../model/JobModel";
import RerunBtn from "./RerunBtn";
import { useContext, useState } from "react";
import { ModalContext } from "../context/ModalProvider";

interface TableRowContainerProps {
  batch: Batch;
  modalOpenRequired: boolean;
}

function TableRowContainer({
  batch,
  modalOpenRequired,
}: TableRowContainerProps) {
  const modalContext = useContext(ModalContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const { job_NAME, start_Time, status, end_Time, exit_Message } = batch;

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

  const openModalContainer = () => {
    if (modalOpenRequired) {
      modalContext?.openModal(job_NAME);
    }
  };

  return (
    <TableRow onClick={openModalContainer} style={{cursor:"pointer"}}>
      <TableCell align="left">{job_NAME}</TableCell>
      <TableCell align="left">{start_Time.substring(0, 11)}</TableCell>
      <TableCell align="left">
        {start_Time && end_Time
          ? getExecutionTime(start_Time, end_Time)
          : "N/A"}
      </TableCell>
      <TableCell align="left">
        {status === "COMPLETED" ? <CompleteBadge /> : <FailedBadge />}
      </TableCell>
      <TableCell align="left">
        <div className="action-buttons">
          {(status === "FAILED" || status === "UNKNOWN") && <RerunBtn />}
          {exit_Message && (
            <IconButton
              onClick={handlePopOverClick}
              disableFocusRipple={true}
              disableTouchRipple={true}
              disableRipple={true}
              className="action-btn"
            >
              view
            </IconButton>
          )}
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

export default TableRowContainer;
