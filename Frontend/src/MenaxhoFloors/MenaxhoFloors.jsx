import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'

const MenaxhoFloors = () => {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    axios.get('http://localhost:3002/getFloors')
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3002/deleteFloors/' + id)
      .then(res => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
          toast.success('Floor u fshie me sukses');
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
        <h3>Floors:</h3>
      </div>

      <div className="d-flex justify-content-end">
        <Link to="/shtoFloors" className='btn btn-success'>Krijo nje floor <i class="bi bi-patch-plus"></i></Link>
      </div>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Floor_number</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((floor, index) => {
              return <tr key={index}>
                <td>{floor.id}</td>
                <td>{floor.name}</td>
                <td>{floor.floor_number}</td>
                <td>{floor.description}</td>
                <td>
                  <Link to={`/updateFloors/` + floor.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                  <button onClick={e => handleDelete(floor.id)} className='btn btn-sm btn-danger'>Delete</button>
                 
                </td>
              </tr>
})}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenaxhoFloors;