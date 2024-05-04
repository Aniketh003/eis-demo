import React, { useContext, useEffect, useState } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ContributorsModalContext } from "../../context/ContibutorsProvider";
import GroupsIcon from '@mui/icons-material/Groups';

interface NavbarProps {
  setSelectVisible: React.Dispatch<React.SetStateAction<string>>;
  selectVisible: string;
}

const Navbar: React.FC<NavbarProps> = ({ setSelectVisible, selectVisible }) => {
  const theme = useTheme();
  const Contributorsmodal = useContext(ContributorsModalContext);

  useEffect(() => {
    const navLink = localStorage.getItem("nav-link")
    if (navLink === null)
      setSelectVisible("Home");
    else
      setSelectVisible(navLink)
  }, [])

  useEffect(() => {
    localStorage.setItem("nav-link", selectVisible);
  }, [selectVisible])

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
        <button
          onClick={() => setSelectVisible("BulkOperations")}
          className={`${selectVisible === "BulkOperations" && "active"} ${theme.palette.mode === "dark" && "dark"}`}
        >
          EIS Bulk Operations
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
            <Brightness7Icon fontSize="large" />
          ) : (
            <Brightness4Icon fontSize="large" />
          )}
        </IconButton>
        <IconButton
          size="large"
          sx={{ ml: 1 }}
          color="inherit"
          onClick={Contributorsmodal?.openModal}>
          <GroupsIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default Navbar;
