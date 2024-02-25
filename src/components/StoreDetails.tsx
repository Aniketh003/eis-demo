import React, { useState } from "react";
import details from "../assets/instance.json";
import { useParams } from "react-router-dom";
const StoreDetails: React.FC = () => {
  const {store_id} = useParams()
  const store = details.find(item => item.s_id === store_id)
  return (
    <div className="store_container">
        {store ? 
      <div className="store-details">
        <h1>Store details</h1>
        <div className="header">
          <p>Enterprise Id : {store?.e_id}</p>
          <div>
            <p>Store Id: {store?.s_id}</p>
            <p>Store name : {store?.store_name}</p>
          </div>
        </div>
        <hr />
        <div className="store-details-2">
          <h3>Stores count: {store?.no_of_s}</h3>
          <p>CNF number : {store?.CNF_no}</p>
        </div>
        <div className="batch-infromation">
          <h2>Batch Infromation</h2>
          <div className="batch-details">
            <p>Batch Status : {store?.store_status}</p>
            <p>Batch L-O-U :{store?.L_O_U} </p>
            <p>
              Rerun : <button>Rerun</button>
            </p>
          </div>
        </div>
        <div className="physical-address">
            <p>Address : {store?.physical_add}</p>
        </div>
      </div>
 : <h1>No store found</h1>}
    </div>
  );
};

export default StoreDetails;
