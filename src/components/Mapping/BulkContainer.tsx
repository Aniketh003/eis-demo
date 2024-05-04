import Dropdown from "./Dropdown";
import "./Bulkcontainer.css"
import { useEffect, useState } from "react";
import DropZone from "./DropZone";
import * as XLSX from 'xlsx';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { apiConfigurationProps, apiConfigurations } from "./DataSet";
import axios from "axios";

export interface dropDownOptions {
  value: string,
  label: string
}

const MappingContainer = () => {
  const [authValue, setAuthValue] = useState<string | "">("")
  const [file, setMainFile] = useState<File | null>(null)
  const [value, setValue] = useState<null | dropDownOptions>(null);
  const [fileData, setFileData] = useState<any[]>([]);
  const [showData, setShowData] = useState<boolean>(false)

  const executeAPI = () => {
    if (value && authValue && file) {
      const selectedAPI = apiConfigurations.find((config: apiConfigurationProps) => config.value === value.value);
      if (selectedAPI) {
        if (selectedAPI.needsLoop) {
          fileData.forEach((rowData, index) => {
            makeAPICall(selectedAPI, rowData, index);
          });
        } else {
          makeAPICall(selectedAPI,Object.values(fileData), 0);
        }
      }
    }
    setMainFile(null)
    setValue(null);
    setAuthValue("")
  };

  const makeAPICall = (selectedAPI: apiConfigurationProps, data, index) => {
    let apiUrl = selectedAPI.url;
    if (apiUrl.includes('${variable}')) {
      apiUrl = apiUrl.replace('${variable}', "S1001201218");
    }

    console.log(data)

    const axiosConfig = {
      method: selectedAPI.method, 
      url: "http://localhost:8081" + apiUrl,
      headers: {
        Authorization: authValue,
      },
      data: data,
    };

    axios(axiosConfig)
      .then(response => {
        if (selectedAPI.needsLoop) {
          console.log(`API call for row ${index + 1} successful:`, response.data);
        } else {
          console.log(`API call successful:`, response.data);
        }
      })
      .catch(error => {
        if (selectedAPI.needsLoop) {
          console.error(`API call for row ${index + 1} error:`, error);
        } else {
          console.error('API call error:', error);
        }
      });
  };


  const handleFileUpload = async () => {
    if (file) {
      const ab = await file.arrayBuffer();
      const wb = XLSX.read(ab, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const [headers, ...rows] = jsonData;
      const formattedData = rows.map((row) => {
        return headers.reduce((obj: any, key, index) => {
          obj[key] = row[index];
          return obj;
        }, {});
      });
      setFileData(formattedData);
    }
  };

  useEffect(() => {
    handleFileUpload();
  }, [file])


  useEffect(() => {
    setMainFile(null);
    setFileData([]);
    setShowData(false)
  }, [value])


  return (
    <div className="bulk-container">
      <div className="api-configure-container">
        <div className="select-operation">
          <Dropdown setValue={setValue} value={value} />
        </div>
        {(value && file) &&
          <div className="auth-token">
            <label>Auth Token</label>
            <input type="text" placeholder="" value={authValue} onChange={(e) => setAuthValue(e.target.value)} />
          </div>
        }
        {authValue &&
          <div className="button-feild">
            <button onClick={executeAPI}>Execute</button>
          </div>
        }
        {(value && file) &&
          <div className="button-feild">
            <button onClick={() => setShowData(!showData)}>{!showData ? "Show data" : "Close"}</button>
          </div>
        }
      </div>
      <div className="file-input-container">
        {value &&
          <DropZone setMainFile={setMainFile} />
        }
      </div>
      {(showData && file) &&
        <div className="show-data-container">
          <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  {fileData.length > 0 &&
                    Object.keys(fileData[0]).map((header, index) => (
                      <TableCell key={index}>{header}</TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {fileData.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    </div>
  );
};

export default MappingContainer;