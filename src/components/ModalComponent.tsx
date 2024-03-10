import {
  Paper,
  TableBody,
  TableContainer,
  Table,
  TablePagination,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import TableHeadContainer from "./TableHead";
import { Batch } from "../model/JobModel";
import TableRowContainer from "./TableRow";
import { ModalContext } from "../context/ModalProvider";

const ModalComponent = () => {
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
      {dateData.length !== 0 ? (
        <div className="date-result">
          <TableContainer component={Paper} style={{ borderRadius: "8px" }}>
            <Table>
              <TableHeadContainer />
              <TableBody>
                {dateData.map((e) => (
                  <TableRowContainer batch={e} modalOpenRequired={false}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
            <TableHeadContainer />
            <TableBody>
              {FilteredData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((e, index) => (
                <TableRowContainer batch={e} key={index} modalOpenRequired={false}/>
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