import React from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface NavbarProps {
  setSelectVisible: React.Dispatch<React.SetStateAction<string>>;
  selectVisible: string;
}

const Navbar: React.FC<NavbarProps> = ({ setSelectVisible, selectVisible }) => {
  const theme = useTheme();

  return (
    <div className="navbar-container">
      <div className="navbar">
        <button
          onClick={() => setSelectVisible("Home")}
          className={`${selectVisible === "Home" && "active"} ${theme.palette.mode === "dark" && "dark"}`}
        >
          Job Reports
        </button>
        <button
          onClick={() => setSelectVisible("BatchReports")}
          className={`${selectVisible === "BatchReports" && "active"} ${theme.palette.mode === "dark" && "dark"}`}
        >
          Batch Reports
        </button>
        <button
          onClick={() => setSelectVisible("EisDataReconciliation")}
          className={`${selectVisible === "EisDataReconciliation" && "active"} ${theme.palette.mode === "dark" && "dark"}`}
        >
          EIS Data Reconciliation
        </button>
      </div>
      <div className="dark-mode-toggle">
        <IconButton
        size="large"
          sx={{ ml: 1 }}
          onClick={theme.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon fontSize="50px"/>
          ) : (
            <Brightness4Icon fontSize="50px"/>
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default Navbar;
