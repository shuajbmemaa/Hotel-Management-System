import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const Service = () => {

  const [data,setData]=useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/getServices')
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result)
        } else {
          toast.error("Erorr")
        }
      })
      .catch(err => console.log(err))
  }, [])


  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-right'>
        <h3>Services</h3>
      </div>
      <div className="d-flex justify-content-end">
      <Link to="/shtoService" className='btn btn-light'><i class="bi bi-plus"></i>Add New Service</Link>
      </div>
      <div className='mt-3'>
          <table className='table mt-3'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Room Type</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((service,index)=>{
                  return <tr key={index}>
                      <td>{service.id}</td>
                      <td>{service.title}</td>
                      <td>{service.roomType}</td>
                      <td>{service.price}</td>
                      <td>
                        <Link to={`/updateServices/`+service.id} className='btn btn-primary btn-sm me-2'>Update  <i class="bi bi-pencil"></i></Link>
                        <button onClick={()=>handleDelete(service.id)} className='btn btn-sm btn-danger'>Delete <i class="bi bi-trash3"></i></button>
                    </td>
                  </tr>
                })}
              </tbody>
          </table>
      </div>
    </div>
  )
}

export default Service