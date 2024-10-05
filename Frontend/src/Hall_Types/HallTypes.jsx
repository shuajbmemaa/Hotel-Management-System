import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './halltypes.css';
import Swal from 'sweetalert2';

const HallTypes = () => {

  const [hallTypes, setHallTypes] = useState([]);
  const [amenties, setAmenties] = useState([]);
  const [selectedAmentie, setSelectedAmentie] = useState('');
  const [title,setTitle]=useState('');

  useEffect(() => {
    axios.get('http://localhost:3002/getAmenties')
      .then(res => {
        if (res.data.Status === "Success") {
          setAmenties(res.data.Result);
        } else {
          toast.error("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3002/getHallTypes')
      .then(res => {
        if (res.data.Status === "Success") {
          setHallTypes(res.data.Result);
        } else {
          toast.error("Gabim");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3002/deleteHallType/${id}`)
          .then(res => {
            if (res.data.Status === "Success") {
              Swal.fire(
                'Deleted!',
                res.data.Message,
                'success'
              ).then(() => {
                window.location.reload(true);
              });
            } else {
              toast.error("Error");
            }
          })
          .catch(err => console.log(err));
      }
    });
  };

  const uniqueAmenties = [...new Set(hallTypes.map(hall => hall.amenties))];

  const filteredHallTypes = hallTypes.filter(hallT =>
    (selectedAmentie === '' || hallT.amenties === selectedAmentie) &&
    hallT.title.toString().toLowerCase().includes(title.toLowerCase())
  );

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-right'>
        <h3>Hall Types</h3>
      </div>
      <div className='d-flex justify-content-end'>
        <Link to='/insertHallTypes' className='btn btn-light'>
          <i className="bi bi-plus"></i>Add New Hall Type
        </Link>
      </div>
      <div className='mt-3'>
      <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="form-control mb-3"
          value={selectedAmentie}
          onChange={(e) => setSelectedAmentie(e.target.value)}
        >
          <option value=''>Choose Amentie</option>
          {uniqueAmenties.map((amentie, index) => (
            <option key={index} value={amentie}>{amentie}</option>
          ))}
        </select>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Short Code</th>
              <th>Base Occupancy</th>
              <th>Higher Occupancy</th>
              <th>Amenties</th>
              <th>Base Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHallTypes.map((hallType, index) => (
              <tr key={index}>
                <td>{hallType.id}</td>
                <td>{hallType.title}</td>
                <td>{hallType.short_code}</td>
                <td>{hallType.baseOccupancy}</td>
                <td>{hallType.higherOccupancy}</td>
                <td>{hallType.amenties}</td>
                <td>{hallType.basePrice}</td>
                <td>
                  <img src={`http://localhost:3002/images/` + hallType.image} alt="" className='hallTypes' />
                </td>
                <td>
                  <Link to={`/updateHallTypes/` + hallType.id} className='btn btn-primary btn-sm me-2'>
                    Update <i className="bi bi-pencil"></i>
                  </Link>
                  <button onClick={() => handleDelete(hallType.id)} className='btn btn-sm btn-danger'>
                    Delete <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HallTypes;