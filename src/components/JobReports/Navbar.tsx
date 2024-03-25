import React from "react";

interface NavbarProps{
    setSelectVisible:React.Dispatch<React.SetStateAction<string>>,
    selectVisible:string
}

const Navbar:React.FC<NavbarProps> = ({setSelectVisible,selectVisible}) => {
  return (
    <div className="navbar">
      <button
        onClick={() => setSelectVisible("Home")}
        className={`${selectVisible === "Home" && "active"}`}
      >
        Job Reports
      </button>
      <button
        onClick={() => setSelectVisible("BatchReports")}
        className={`${selectVisible === "BatchReports" && "active"}`}
      >
        Batch Reports
      </button>
      <button
        onClick={() => setSelectVisible("EisDataReconciliation")}
        className={`${selectVisible === "EisDataReconciliation" && "active"}`}
      >
        Eis Data Reconciliation
      </button>
    </div>
  );
};

export default Navbar;
