import {
  Paper,
  TableBody,
  TableContainer,
  Table,
  TablePagination,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Batch } from "../model/JobModel";
import { ModalContext } from "../context/ModalProvider";
import ModalRowContainer from "./ModalRowsContainer";
import { JobContext } from "../context/JobDataProvider";
import ModalHeadContainer from "./ModalHead";

const ModalComponent = () => {
  const jobContext = useContext(JobContext)
  const rowsPerPageOptions = [7, 15, 25];
  const today = new Date().toISOString().split("T")[0];
  const modalContext = useContext(ModalContext);
  const [data, setData] = useState<Batch[]>([]);
  const [FilteredData, setFilteredData] = useState<Batch[]>(data);
  const [filter, setFilter] = useState("all");
  const [dateData, setDateData] = useState<Batch[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [date, setDate] = useState("2024-01-23");
  const [focused, setFocused] = useState("all");

  const fetchData = () => {
    const data = fetch(
      `http://localhost:8080/batch-jobs/data?jobName=${modalContext?.batchName}`
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData()
    setFilter("all")
    setFocused("all")
    handleFilterButton(focused,filter)
  },[jobContext?.dataChange])

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    try {
      if (date !== "") {
        const data = fetch(
          `http://localhost:8080/batch-jobs/getJob?jobName=${modalContext?.batchName}&date=${date}`
        )
          .then((res) => res.json())
          .then((res) => setDateData(res));
      }
    } catch (error) {
      console.log(error);
    }
  }, [date]);

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
      const otherData = data.filter(
        (item) => item.status === "FAILED" || item.status === "UNKNOWN"
      );
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
      <div className="filter-container-date">
        <h2>
          Result based on <b>{date}</b>
        </h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {dateData.length !== 0 ? (
        <div className="date-result">
          <TableContainer component={Paper} style={{ borderRadius: "8px" }}>
            <Table>
              <ModalHeadContainer />
              <TableBody>
                {dateData.map((e,index) => (
                  <ModalRowContainer batch={e} modalOpenRequired={false} key={index}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No data Found</p>
      )}
      <div className="modal-contaier">
        <div className="filter-container-all">
          <div className="past-container">
            <p>Past {rowsPerPage} days</p>
          </div>
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
          <ModalHeadContainer />
            <TableBody>
              {FilteredData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((e, index) => (
                <ModalRowContainer
                  batch={e}
                  key={index}
                  modalOpenRequired={false}
                />
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
