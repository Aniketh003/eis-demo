import React, { useState } from "react";

interface HeaderProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setDateFilter: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter:React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({ setFilter, setDateFilter,setStatusFilter }) => {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [status,setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "text") {
      setText(e.target.value);
      setFilter(e.target.value);
    } else if (e.target.type === "date") {
      const selectedDate = e.target.value;
      const formattedDate = new Date(selectedDate).toLocaleDateString("en-GB");
      setDate(selectedDate);
      setDateFilter(formattedDate);
    }
  };

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value)
    setStatusFilter(e.target.value);
  }

  return (
    <div className="header-container">
      <div className="input-container">
        <input
          className="input-text"
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="search by enterpriseid or storeid"
        />
        <input
          type="date"
          className="input-date"
          value={date}
          onChange={handleChange}
        />
        <select value={status} onChange={handleStatus}>
          <option value="">select status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
