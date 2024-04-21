import { useEffect, useState } from 'react'
import DropZone from './DropZone'
import * as XLSX from "xlsx";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { toast } from 'react-toastify';
import axiosInstance from '../../context/axios';

interface Departments {
  storeId:string,
  Departments: string,
}
const StoreDeptMapping = () => {
  const [storeId, setStoreId] = useState<string>("")
  const [file, setMainFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<Departments[]>([]);
  const [chooseFile, setChooseFile] = useState<boolean>(false)
  const [downloadExcel, setDownloadExcel] = useState<boolean>(false);

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        if (sheet['A1'] && sheet['A1'].v === 'Departments') {
          const parsedData = XLSX.utils.sheet_to_json<Departments>(sheet);
          const updatedParsedData = parsedData.map((item) => ({
            ...item,
            storeId:storeId,
          }));
          setJsonData(updatedParsedData)
        } else {
          toast.error("'departments' column not found in the Excel sheet.")
          setMainFile(null);
        }
      };
    }
  };

  const handleRunAll = async () => {
    try {
      const departmentsArray = jsonData.map((item) => item.Departments);
      
      if (storeId && departmentsArray.length > 0) {
        const response = await axiosInstance.put(`/dealerStores/${storeId}/storeDepartmentMapping`, {
          departmentIds: departmentsArray,
        }).then((res) => {
          setDownloadExcel(true)
        })
      } else {
        toast.error('Store ID or departments data is missing.');
      }
    } catch (err) {
      console.log(err);
      toast.error('Error occurred while processing.');
    }
  };
  
  const handleDownloadExcel = () => {
    const newBook = XLSX.utils.book_new();
    const converted = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(newBook, converted, "Sheet1");
    XLSX.writeFile(newBook, "output.xlsx");
    setMainFile(null);
    setJsonData([]);
    setStoreId("")
    setChooseFile(false);
  }

  useEffect(() => {
    handleFileUpload();
  }, [file])

  return (
    <div className='store-department-mapping'>
      <div className="storeid-input">
        <input type="text" placeholder='Enter store Id' value={storeId} onChange={(e) => setStoreId(e.target.value)} />
        <button onClick={() => setChooseFile(true)}>Next</button>
      </div>
      {(chooseFile && !file) &&
        <div>
          <h3>Choose a file:</h3>
          <DropZone setMainFile={setMainFile} />
        </div>
      }
      {jsonData.length !== 0 && (
        <div className="preview-data">
          <div className="run-all">
            {downloadExcel ?
              <button onClick={handleDownloadExcel}>Downlaod</button>
              :
              <button onClick={handleRunAll}>Run all</button>
            }
          </div>
          <TableContainer component={Paper} style={{ borderRadius: "10px" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ height: "50px" }}>
                    Store id
                  </TableCell>
                  <TableCell>Department</TableCell>
                  {/* <TableCell>Status</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {jsonData.map((e, index) => (
                  <TableRow key={index}>
                    <TableCell>{storeId}</TableCell>
                    <TableCell>{e.Departments}</TableCell>
                    {/* <TableCell>{statusMap[e.entityValue] === "Done" ? <CompleteBadge /> : <p>-</p>}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  )
}

export default StoreDeptMapping
