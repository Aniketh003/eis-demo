import { Popover, TableCell, TableRow, Typography } from "@mui/material";
import CompleteBadge from "./CompleteBadge";
import FailedBadge from "./FailedBadge";
import { Batch } from "../model/JobModel";
import { useContext, useState } from "react";
import { ModalContext } from "../context/ModalProvider";

interface TableRowContainerProps {
  batch: Batch[];
  modalOpenRequired: boolean;
}

function CoreRowContainer({
  batch,
  modalOpenRequired,
}: TableRowContainerProps) {
  const modalContext = useContext(ModalContext);

  const [anchorEl, setAnchorEl] = useState(null);

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

  const openModalContainer = (jobName: string) => {
    if (modalOpenRequired) {
      modalContext?.openModal(jobName);
    }
  };

  const tableCountCoreHeader = [
    "Store Update Job",
    "Generate Stores Job",
    "Generate Departments Job",
    "UpSert Enterprises Job"
  ];

  return (
    <>
      {tableCountCoreHeader.map((jobName) => {
        const jobData = batch.find(
          (e) =>
            e.job_NAME.toLowerCase() ===
            jobName.toLowerCase().replace(/\s/g, "")
        );
        return (
          <TableRow
            onClick={() =>
              openModalContainer(jobName.toLowerCase().replace(/\s/g, ""))
            }
            style={{ cursor: "pointer" }}
            key={jobName}
          >
            <TableCell align="left">{jobName}</TableCell>
            <TableCell align="left">
              {jobData?.start_Time.substring(0, 11) || "-- --"}
            </TableCell>
            <TableCell align="left">
              {jobData?.start_Time && jobData?.end_Time
                ? getExecutionTime(jobData?.start_Time, jobData?.end_Time)
                : "-- --"}
            </TableCell>
            <TableCell align="left">
              {jobData ? (
                jobData?.status === "COMPLETED" ? (
                  <CompleteBadge />
                ) : (
                  <FailedBadge />
                )
              ) : (
                "-- --"
              )}
            </TableCell>
            <TableCell align="left">
              {jobData ? (
                <div className="action-buttons">
                  <button
                    className={`action-btn ${
                      jobData?.status === "COMPLETED" && "disabled"
                    }`}
                    disabled={jobData?.status === "COMPLETED"}
                  >
                    rerun
                  </button>
                  <button
                    className={`action-btn ${
                      jobData?.status === "COMPLETED" && "disabled"
                    }`}
                    disabled={jobData?.status === "COMPLETED"}
                    onClick={handlePopOverClick}
                  >
                    reason
                  </button>
                </div>
              ) : (
                "-- --"
              )}
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
                {jobData?.exit_Message}
              </Typography>
            </Popover>
          </TableRow>
        );
      })}
    </>
  );
}

export default CoreRowContainer;
