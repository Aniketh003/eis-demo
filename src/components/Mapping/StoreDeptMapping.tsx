import { useEffect, useState } from 'react'
import DropZone from './DropZone'
import * as XLSX from "xlsx";

const StoreDeptMapping = () => {
  const [storeId, setStoreId] = useState("")
  const [file,setMainFile] = useState(null);
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setJsonData(parsedData);
      };
    }
  };

  useEffect(() => {
    handleFileUpload();
  }, [file])

  return (
    <div className='store-department-mapping'>
      <div className="storeid-input">
        <input type="text" placeholder='Enter store Id' value={storeId} onChange={(e) => setStoreId(e.target.value)} />
        <button>Next</button>
      </div>
      <div>
        <h3>Choose a file:</h3>
        <DropZone setMainFile={setMainFile} />
      </div>
    </div>
  )
}

export default StoreDeptMapping
