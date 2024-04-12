import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const InsertFloors = () => {
  const [floor, setFloors] = useState({
    name: '',
    floor_number:'',
    description:''

  });

  const navigate = useNavigate();



  const handleSubmit = (event) => {
    event.preventDefault();

    if(!floor.name || !floor.floor_number || !floor.description){
        toast.warn("Ju lutem mbusheni te gjithe formen !");
        return;
    }
    
    axios.post('http://localhost:3002/shtonjeFloor', floor)
      .then(res => {
        navigate('/menaxhoFloors');
        toast.success('Floor u shtua!');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Shto Floor</h2>
      <form class="row g-3 w-50" onSubmit={handleSubmit}>
        <div class="col-12">
          <label for="inputName" class="form-label">Emri</label>
          <input type="text" class="form-control" id="inputName" placeholder='Vendos Emrin' autoComplete='off'
            onChange={e => setFloors({ ...floor, name: e.target.value })} />
        </div>
        <div class="col-12">
          <label for="inputName" class="form-label">Floor Number</label>
          <input type="number" class="form-control" id="inputName" placeholder='Vendos number' autoComplete='off'
            onChange={e => setFloors({ ...floor, floor_number: e.target.value })} />
        </div>
        <div class="col-12">
          <label for="inputName" class="form-label">Description</label>
          <input type="text" class="form-control" id="inputName" placeholder='Vendos Emrin' autoComplete='off'
            onChange={e => setFloors({ ...floor, description: e.target.value })} />
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Krijo</button>
        </div>
      </form>
    </div>
  );
};

export default InsertFloors;



