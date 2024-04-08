import {
  Paper,
  TableBody,
  TableContainer,
  Table,
  Pagination,
  Card,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Batch } from "../../model/JobModel";
import { ModalContext } from "../../context/ModalProvider";
import ModalRowContainer from "./ModalRowsContainer";
import ModalHeadContainer from "./ModalHead";
import axiosInstance from "../../context/axios";

const ModalComponent = () => {
  const modalContext = useContext(ModalContext);
  const rowsPerPageOptions = [7, 15, 25];
  const today = new Date().toISOString().split("T")[0];
  const [data, setData] = useState<Batch[]>([]);
  const [filter, setFilter] = useState("all");
  const [total, setTotal] = useState(0);
  const [dateData, setDateData] = useState<Batch[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [date, setDate] = useState("2024-01-23");
  const [focused, setFocused] = useState("all");

  const fetchData = async (
    page: number,
    rowsPerPage: number,
    status: string
  ) => {
    try {
      const response = await axiosInstance.get(
        `/batch-jobs/pagination/${status}?jobName=${modalContext?.batchName}&page=${page}&size=${rowsPerPage}`
      );
      setData(response.data.content);
      setTotal(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(page, rowsPerPage, filter);
  }, []);

  useEffect(() => {
    try {
      if (date !== "") {
        axiosInstance
          .get(
            `/batch-jobs/getJob?jobName=${modalContext?.batchName}&date=${date}`
          )
          .then((res) => res.data)
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
    setPage(0);
    fetchData(page, rowsPerPage, filter);
  }, [filter]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
    fetchData(newPage, rowsPerPage, filter);
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
          <TableContainer component={Card} style={{ borderRadius: "8px" }}>
            <Table>
              <ModalHeadContainer />
              <TableBody>
                {dateData.map((e, index) => (
                  <ModalRowContainer
                    batch={e}
                    modalOpenRequired={false}
                    key={index}
                  />
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
            <button
              className={focused === "running" ? "active" : ""}
              onClick={() => handleFilterButton("running", "RUNNING")}
            >
              Running
            </button>
          </div>
        </div>
        <TableContainer component={Paper} style={{ borderRadius: "8px" }}>
          <Table>
            <ModalHeadContainer />
            <TableBody>
              {data.map((e, index) => (
                <ModalRowContainer
                  batch={e}
                  key={index}
                  modalOpenRequired={false}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination">
          <Pagination
            count={total - 1}
            onChange={handlePageChange}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
