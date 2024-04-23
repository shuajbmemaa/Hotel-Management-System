import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const Hall = () => {

  const[halls,setHalls]=useState([]);
  const [kerkoSipasFloors,setKerkoSipasFloors]=useState('');
  const [kerkoSipasHallNumber,setKerkoSipasHallNumber]=useState('');

  const handleDelete= (id)=>{
    if(window.confirm("Are you sure you want to remove this Hall??")){
      axios.delete('http://localhost:3002/deleteHall/'+id)
      .then(res=>{
        if(res.data.Status === "Success"){
          window.location.reload(true)
          toast.success(res.data.Message);
        }else{
          toast.error("Erorr")
        }
      })
      .catch(err=>console.log(err))
    }
  }

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

  const search=halls.filter(searchFilter=>
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