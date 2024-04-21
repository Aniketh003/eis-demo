import { useEffect, useState } from "react";
import DropZone from "./DropZone";
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
import axiosInstance from "../../context/axios";
import { toast } from "react-toastify";
import CompleteBadge from "../Badges/CompleteBadge";

interface EntityData {
  entityValue: string;
  cdkClientFlag: string;
}

const DMSMapping = () => {
  const [file, setMainFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<EntityData[]>([]);
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});
  const [downloadExcel, setDownloadExcel] = useState<boolean>(false);

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        if (sheet['A1'] && sheet['A1'].v === 'entityValue') {
          const parsedData = XLSX.utils.sheet_to_json<EntityData>(sheet);
          const updatedParsedData = parsedData.map((item) => ({
            ...item,
            cdkClientFlag: 'T'
          }));

          setJsonData(updatedParsedData);

          const initialStatusMap: Record<string, string> = {};
          updatedParsedData.forEach((item) => {
            initialStatusMap[item.entityValue] = "";
          });

          setStatusMap(initialStatusMap);
        } else {
          toast.error("'entityValue' column not found in the Excel sheet.")
          setMainFile(null);
        }
      };
    }
  };


  const handleRunAll = async () => {
    const updatedStatusMap: Record<string, string> = { ...statusMap };
    try {
      await Promise.all(
        jsonData.map(async (element) => {
          try {
            const response = await axiosInstance.post(
              '/dealerStores/dmsNonDmsMapping',
              {
                entityValue: element.entityValue,
                cdkClientFlag: 'T'
              }
            );
            updatedStatusMap[element.entityValue] = 'Done';
          } catch (error) {
            console.log(`Error processing entity ${element.entityValue}:`, error);
            updatedStatusMap[element.entityValue] = 'Error';
          }
        })
      );

      setStatusMap(updatedStatusMap);
      setDownloadExcel(true);
    } catch (error) {
      console.log('Error occurred during batch processing:', error);
    }
  };


  const handleDownloadExcel = () => {
    const newBook = XLSX.utils.book_new();
    const converted = XLSX.utils.json_to_sheet(jsonData);
    XLSX.utils.book_append_sheet(newBook, converted, "Sheet1");
    XLSX.writeFile(newBook, "output.xlsx");

    setMainFile(null);
    setJsonData([]);
    setDownloadExcel(false)
    setStatusMap({});
  };

  useEffect(() => {
    handleFileUpload();
  }, [file]);

  return (
    <div className="dms-mapping-container">
      {!file && (
        <div className="entity-input-container">
          <div>
            <h3>Choose a file:</h3>
            <DropZone setMainFile={setMainFile} />
          </div>
        </div>
      )}
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
                    Entity Value
                  </TableCell>
                  <TableCell>Flag</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jsonData.map((e, index) => (
                  <TableRow key={index}>
                    <TableCell>{e.entityValue}</TableCell>
                    <TableCell>{e.cdkClientFlag}</TableCell>
                    <TableCell>{statusMap[e.entityValue] === "Done" ? <CompleteBadge /> : <p>-</p>}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default DMSMapping;
