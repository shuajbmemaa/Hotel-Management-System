import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiUploadCloud } from 'react-icons/fi';
import './importService.css';

const ImportServicesJson = () => {
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
          try {
            const jsonData = JSON.parse(e.target.result);
  
            axios.post('http://localhost:3002/importJsonData', { data: jsonData })
              .then(res => {
                console.log(res.data);
                toast.success('Te dhenat u importuan me sukses nga JSON file.');
                navigate('/service');
              })
              .catch(err => {
                console.error('Error uploading data:', err);
                toast.error('Failed to upload data from the JSON file.');
              });
          } catch (err) {
            console.error('Error parsing JSON:', err);
            toast.error('Invalid JSON file.');
          }
        };
        reader.readAsText(file);
      } else {
        toast.error('Please select a file to upload.');
      }
    };
  
    return (
      <div className="import-container">
            <div className="import-card">
                <h2 className="import-title">Import Services</h2>
                <div className="import-form">
                    <label htmlFor="file-upload" className="file-label">
                        <FiUploadCloud className="upload-icon" />
                        <span>{file ? file.name : 'Choose a JSON file'}</span>
                    </label>
                    <input 
                        id="file-upload"
                        type="file" 
                        onChange={handleFileChange} 
                        className="file-input" 
                        accept=".json"
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

export default ImportServicesJson