import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  TablePagination,
  Popover,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Batch } from "./Table";
import FailedBadge from "./FailedBadge";
import CompleteBadge from "./CompleteBadge";
import RerunBtn from "./RerunBtn";
import ErrorBtn from "./ErrorBtn";

const ModalComponent = () => {
  const rowsPerPageOptions = [7, 15, 25];
  const today = new Date().toISOString().split("T")[0];
  const { batch_name } = useParams();
  const [data, setData] = useState<Batch[]>([]);
  const [FilteredData, setFilteredData] = useState<Batch[]>(data);
  const [filter, setFilter] = useState("all");
  const [dateData, setDateData] = useState<Batch>();
  const [page, setPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [date, setDate] = useState("2024-01-23");
  const [focused, setFocused] = useState("all");

  const getExecutionTime = (start: string, end: string): string | null => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const hr = Math.abs(endTime.getHours() - startTime.getHours());
    const min = Math.abs(endTime.getMinutes() - startTime.getMinutes());
    const sec = Math.abs(endTime.getSeconds() - startTime.getSeconds());
    return `${hr >= 12 ? hr : "0" + hr}:${min >= 10 ? min : "0" + min}:${
      sec >= 10 ? sec : "0" + sec
    }`;
  };

  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const fetchData = () => {
    const data = fetch(
      `http://localhost:8080/batch-jobs/data?jobName=${batch_name}`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    try {
      if (date !== "") {
        const data = fetch(
          `http://localhost:8080/batch-jobs/getJob?jobName=${batch_name}&date=${date}`
        )
          .then((res) => res.json())
          .then((res) => setDateData(res));
      }
    } catch (error) {
      console.log(error);
    }
  }, [date]);

  console.log(FilteredData)

  const handleFilterButton = (buttonName: string, filter: string) => {
    setFocused(buttonName);
    setFilter(filter);
  };

  useEffect(() => {
    if (filter === "all") {
      setFilteredData(data);
    } else if (filter === "COMPLETED") {
      const completedData = data.filter((item) => item.status === "COMPLETED");
      setFilteredData(completedData);
    } else {
      const otherData = data.filter((item) => item.status === "FAILED" || item.status === "UNKNOWN");
      setFilteredData(otherData);
    }
    setPage(0);
  }, [filter]);
  

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="modal-container">
      <div className="filter-container">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <h2>
        Result based on <b>{date}</b>
      </h2>
      {dateData !== null ? (
        <div className="date-result">
          <TableContainer component={Paper} style={{ borderRadius: "8px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{ width: `${100 / 5}%`, height: "50px" }}
                  >
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
              <TableBody>
                <TableRow>
                  <TableCell align="left">{dateData?.job_NAME}</TableCell>
                  <TableCell align="left">
                    {dateData?.start_Time.substring(0, 11)}
                  </TableCell>
                  <TableCell align="left">
                    {dateData?.start_Time && dateData?.end_Time
                      ? getExecutionTime(dateData?.start_Time, dateData.end_Time)
                      : "N/A"}
                  </TableCell>
                  <TableCell align="left">
                    {dateData?.status === "COMPLETED" ? (
                      <CompleteBadge />
                    ) : (
                      <FailedBadge />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <div className="action-buttons">
                      {dateData?.status === "FAILED" && <RerunBtn />}
                      {dateData?.exit_Message && (
                        <IconButton
                          aria-describedby={id}
                          onClick={handlePopOverClick}
                          disableFocusRipple={true}
                          disableTouchRipple={true}
                          disableRipple={true}
                        >
                          <ErrorBtn />
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
                      {dateData?.exit_Message}
                    </Typography>
                  </Popover>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : dateData ? (
        <></>
      ) : (
        <p style={{ textAlign: "center" }}>No data Found</p>
      )}
      <div className="main-contaier">
        <div className="filter-container">
          <div className="filter-buttons">
            <button
              className={focused === "all" ? "active" : ""}
              onClick={() => handleFilterButton("all", "all")}
            >
              All
            </button>
            <button
              className={focused === "completed" ? "active" : ""}
              onClick={() => handleFilterButton("completed", "COMPLETED")}
            >
              Completed
            </button>
            <button
              className={focused === "failed" ? "active" : ""}
              onClick={() => handleFilterButton("failed", "FAILED")}
            >
              Failed
            </button>
          </div>
        </div>
        <TableContainer component={Paper} style={{ borderRadius: "8px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{ width: `${100 / 5}%`, height: "50px" }}
                >
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
            <TableBody>
              {FilteredData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((e, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{e.job_NAME}</TableCell>
                  <TableCell align="left">
                    {e.start_Time.substring(0, 11)}
                  </TableCell>
                  <TableCell align="left">
                    {e.start_Time && e.end_Time
                      ? getExecutionTime(e.start_Time, e.end_Time)
                      : "N/A"}
                  </TableCell>
                  <TableCell align="left">
                    {e.status === "COMPLETED" ? (
                      <CompleteBadge />
                    ) : (
                      <FailedBadge />
                    )}
                  </TableCell>
                  <TableCell align="left">
                    <div className="action-buttons">
                      {(e.status === "FAILED" || e.status === "UNKNOWN") && (
                        <button className="action-btn">rerun</button>
                      )}
                      {e.exit_Message && (
                        <IconButton
                          aria-describedby={id}
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
                     <p> {e.exit_Message}</p>
                    </Typography>
                  </Popover>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={FilteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </div>
  );
};

export default ModalComponent;
