import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; 
import { toast } from 'react-toastify';
import axios from 'axios';
import '../form.css';

const InsertHouseKS = () => {
  const [houseK, setHouseK] = useState({
   title: '',
    short_description: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!houseK.title || !houseK.short_description) {
      toast.warn("Ju lutem mbusheni të gjithë formën!");
      return;
    }

    axios.post('http://localhost:3002/shtoHouseK', houseK)
      .then(res => {
        console.log(res.data);
        navigate('/houseKeppingS');
        toast.success('Housekeeping status u shtua me sukses!');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      
      <div className="form-border">
        <Link to="/houseKeppingS" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
            <h3 className="text-start">Add Housekeeping Status</h3>

          <div className='col-12'>
            <label htmlFor="inputTitle" className="form-label">Title</label>
            <input type="text" className="form-control" id="inputTitle" placeholder='Title' autoComplete='off'
              onChange={e => setHouseK({ ...houseK, title: e.target.value })} />
          </div>
          <div className='col-12'>
            <label htmlFor="inputDesc" className="form-label">Short Description</label>
            <input type="text" className="form-control" id="inputDesc" placeholder='Title' autoComplete='off'
              onChange={e => setHouseK({ ...houseK, short_description: e.target.value })} />
          </div>
          <div className="col-12">
                    <div className="text-center ">
                    <button type="submit" className="btn btn-dark" style={{ width: '50%' }}>Create</button>
                        </div>
                    </div>
        </form>
      </div>
    </div>
  )
}
export default InsertHouseKS
