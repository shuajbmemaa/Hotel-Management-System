import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { FiUploadCloud } from 'react-icons/fi';

const ImportFromExcel = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        axios.post('http://localhost:3002/importDataToRooms', { data: excelData })
          .then(res => {
            if (res.status === 200) {
              toast.success('Te dhenat u importuan me sukses nga Excel file.');
              navigate('/menaxhoRoom');
            }
          })
          .catch(err => {
            console.error('Error uploading data:', err);
            toast.error('Failed to upload data from the Excel file.');
          });
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error('Please select a file to upload.');
    }
  };

  return (
    <div className="import-container">
      <div className="import-card">
        <h2 className="import-title">Import Rooms</h2>
        <div className="import-form">
          <label htmlFor="file-upload" className="file-label">
            <FiUploadCloud className="upload-icon" />
            <span>{file ? file.name : 'Choose an Excel file'}</span>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="file-input"
            accept=".xlsx, .xls"
          />
          <button
            onClick={handleUpload}
            className="button-upload"
            disabled={!file}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportFromExcel;
