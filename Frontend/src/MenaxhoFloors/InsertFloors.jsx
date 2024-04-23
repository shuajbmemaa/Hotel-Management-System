import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {CircleLoader} from 'react-spinners'


const InsertFloors = () => {
  const [floor, setFloors] = useState({
    name: '',
    floor_number: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!floor.name || !floor.floor_number || !floor.description) {
      toast.warn("Ju lutem mbusheni të gjithë formën!");
      return;
    }

    setLoading(true);

    axios.post('http://localhost:3002/shtonjeFloor', floor)
      .then(res => {
        setTimeout(() => {
          navigate('/menaxhoFloors');
          setLoading(false);
          toast.success('Floor u shtua!');
        }, 2000);
      })
      .catch(err => {
        setLoading(false);
        if (err.response && err.response.status === 400) {
          toast.warn('Emri i floor eshte ne perdorim. Ju lutem provoni nje emer tjeter.');
        } else {
          console.log(err);
          toast.error('Gabim ne server');
        }
      });
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Shto Floor</h2>
      {loading ? ( 
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircleLoader color="#007bff" loading={loading} size={140} />
      </div>
      ) : (
        <form className="row g-3 w-50" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">Emri</label>
            <input type="text" className="form-control" id="inputName" placeholder='Vendos Emrin' autoComplete='off'
              onChange={e => setFloors({ ...floor, name: e.target.value })} />
          </div>
          <div className="col-12">
            <label htmlFor="inputFloorNumber" className="form-label">Floor Number</label>
            <input type="number" className="form-control" id="inputFloorNumber" placeholder='Vendos numrin' autoComplete='off'
              onChange={e => setFloors({ ...floor, floor_number: e.target.value })} />
          </div>
          <div className="col-12">
            <label htmlFor="inputDescription" className="form-label">Description</label>
            <input type="text" className="form-control" id="inputDescription" placeholder='Vendos përshkrimin' autoComplete='off'
              onChange={e => setFloors({ ...floor, description: e.target.value })} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Krijo</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default InsertFloors;
