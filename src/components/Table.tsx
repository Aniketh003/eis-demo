import React, { useEffect, useState } from "react";
import details from "../assets/execution.json";
import { Link } from "react-router-dom";
interface TableProps {
  filter: String;
  date: String;
  status: String;
}
const Table: React.FC<TableProps> = ({ filter, date, status }) => {
  const [data, setData] = useState(details);
  useEffect(() => {
    console.log(status,date,filter)
    if (filter === "" && date === "" && status === "" ) {
      setData(details);
    } else {
      const filteredData = details.filter(
        (execution) =>
          (execution.store_id.toLowerCase().includes(filter.toLowerCase()) ||
            execution.enterprise_id.toLowerCase().includes(filter.toLowerCase())) &&
          execution.execution_date.includes(date.toLowerCase()) &&
          execution.status.toLowerCase().includes(status.toLowerCase())
      );
      setData(filteredData);
    }
  }, [filter, date, status]);
  
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Enterprise Id</th>
            <th>Store Id</th>
            <th>Execution Time</th>
            <th>Execution Date</th>
            <th>Execution Status</th>
            <th>Reason for Failure</th>
            <th>Action</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((execution, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{execution.enterprise_id}</td>
              <td><Link to={`/store/${execution.store_id}`}>{execution.store_id}</Link></td>
              <td>{execution.execution_time}</td>
              <td>{execution.execution_date}</td>
              <td
                style={
                  execution.status === "False"
                    ? { backgroundColor: "red" }
                    : { backgroundColor: "green" }
                }
              >
                {execution.status === "False" ? "failed" : "success"}
              </td>
              <td>{execution.reason_for_failure}</td>
              <td>
                {execution.status === "False" ? <button>Rerun</button> : "-"}
              </td>
              <td>
                <button>view</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
