import { useTheme } from "@mui/material/styles";
import React from "react";

interface MapNavbarProps {
  setSelectVisible: React.Dispatch<React.SetStateAction<string>>;
  selectVisible: string;
}

const MappingNavbar: React.FC<MapNavbarProps> = ({
  setSelectVisible,
  selectVisible,
}) => {
  const theme = useTheme();
  return (
    <div className="navbar-container">
      <div className="navbar">
        <button
          onClick={() => setSelectVisible("DMS")}
          className={`${selectVisible === "DMS" && "active"} ${
            theme.palette.mode === "dark" && "dark"
          }`}
        >
          DMS Mapping
        </button>
        <button
          onClick={() => setSelectVisible("DeptStore")}
          className={`${selectVisible === "DeptStore" && "active"} ${
            theme.palette.mode === "dark" && "dark"
          }`}
        >
          Store/Depatment Mapping
        </button>
      </div>
    </div>
  );
};

export default MappingNavbar;
