import React from "react";

interface StatusBadgeProps {
  status: string;
}

const BatchReportStatusButtons: React.FC<StatusBadgeProps> = ({ status }) => {
  let dotColor = "";
  let bgColor = "";

  switch (status) {
    case "ACTION":
      dotColor = "blue"; 
      bgColor = "rgb(136, 191, 250)";
      break;
    case "ERROR":
      dotColor = "red";
      bgColor = "rgb(240, 162, 162)";
      break;
    case "EIS_DATA_ISSUE":
      dotColor = "orange";
      bgColor = "#ffcc99";
      break;
    case "SUCCESS":
      dotColor = "green";
      bgColor = "rgb(162, 240, 162)";
      break;
    case "PARTIAL_SUCCESS":
      dotColor = "yellow";
      bgColor = "rgb(255, 242, 167)";
      break;
    case "BRAND_OEM_DATA_ISSUE":
      dotColor = "#f9a1fa";
      bgColor = "rgb(252 188 240)";
      break;
    default:
      break;
  }

  return (
    <div className="status-badge" style={{ backgroundColor: bgColor }}>
      <span className="dot" style={{ backgroundColor: dotColor }}></span>
      <p>{status}</p>
    </div>
  );
};

export default BatchReportStatusButtons;
