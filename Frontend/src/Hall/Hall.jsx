import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Hall = () => {

  const [halls,setHalls]=useState([]);
  const [kerkoSipasFloors,setKerkoSipasFloors]=useState('');
  const [kerkoSipasHallNumber,setKerkoSipasHallNumber]=useState('');
  const [hallTypes, setHallTypes] = useState([]);
  const [selectedHallType, setSelectedHallType] = useState('');

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
            axios.delete(`http://localhost:3002/deleteHall/${id}`)
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

  useEffect(()=>{
    axios.get('http://localhost:3002/getHall')
    .then(res=>{
      if(res.data.Ok === "OK"){
        setHalls(res.data.Halls)
      }else{
        toast.error("Error")
      }
    }).catch(err=>console.log(err))
  })

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

  const uniqueHallTypes =[... new Set(halls.map(hall => hall.halltype))]

  const search=halls.filter(searchFilter=>
          (selectedHallType === '' || searchFilter.halltype === selectedHallType) &&
          searchFilter.emri.toString().toLowerCase().includes(kerkoSipasFloors.toLowerCase())&&
          searchFilter.hall_number.toString().toLowerCase().includes(kerkoSipasHallNumber.toLowerCase())
      );

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-right'>
        <h3>Halls</h3>
      </div>
      <div className="d-flex justify-content-end">
      <Link to="/shtoHalls" className='btn btn-light'><i class="bi bi-plus"></i>Add New Hall</Link>
      </div>
      <div className='mt-3'>
      <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by floor"
          value={kerkoSipasFloors}
          onChange={(e) => setKerkoSipasFloors(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search by hall number"
          value={kerkoSipasHallNumber}
          onChange={(e) => setKerkoSipasHallNumber(e.target.value)}
        />
        <select
          className="form-control mb-3"
          value={selectedHallType}
          onChange={(e) => setSelectedHallType(e.target.value)}
        >
          <option value=''>Choose Hall Type</option>
          {uniqueHallTypes.map((hallType, index) => (
            <option key={index} value={hallType}>{hallType}</option>
          ))}
        </select>
          <table className='table mt-3'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Floor</th>
                  <th>Hall Type</th>
                  <th>Hall Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {search.map((hall,index)=>{
                  return <tr key={index}>
                      <td>{hall.id}</td>
                      <td>{hall.emri}</td>
                      <td>{hall.halltype}</td>
                      <td>{hall.hall_number}</td>
                      <td>
                        <Link to={`/updateHalls/`+hall.id} className='btn btn-primary btn-sm me-2'>Update  <i class="bi bi-pencil"></i></Link>
                        <button onClick={()=>handleDelete(hall.id)} className='btn btn-sm btn-danger'>Delete <i class="bi bi-trash3"></i></button>
                    </td>
                  </tr>
                })}
              </tbody>
          </table>
      </div>
    </div>
  )
}

export default Hall