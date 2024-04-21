import React, { useState } from "react";
import MappingNavbar from "./MappingNavbar";
import StoreDeptMapping from "./StoreDeptMapping";
import DMSMapping from "./DMSMapping";

const MappingContainer = () => {
  const [selectVisible, setSelectVisible] = useState<string>("DMS");
  return (
    <div className="mapping-container">
      <MappingNavbar
        selectVisible={selectVisible}
        setSelectVisible={setSelectVisible}
      />
      <div className="container-wrapper">
        <div className={`container ${selectVisible !== "DMS" && "hidden"}`}>
          <DMSMapping />
        </div>
        <div className={`container ${selectVisible !== "DeptStore" && "hidden"}`}>
          <StoreDeptMapping />
        </div>
      </div>
    </div>
  );
};

export default MappingContainer;
