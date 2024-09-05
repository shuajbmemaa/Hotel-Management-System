import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import './menaxhoAmenties.css'
import Swal from 'sweetalert2';

const MenaxhoAmenties = () => {


    const[data,setData]=useState([]);

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
              axios.delete(`http://localhost:3002/deleteAmenties/${id}`)
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
        axios.get('http://localhost:3002/getAmenties')
        .then(res=>{
          if(res.data.Status === "Success"){
            setData(res.data.Result)
          }else{
            toast.error("Erorr")
          }
        })
        .catch(err=>console.log(err))
        },[])

  return (
    <div className='px-5 py-3'>
        <div className='d-flex justify-content-center'>
            <h3> Amenities </h3>
        </div>
        <div className="d-flex justify-content-end">
        <Link to="/shtoAmenties" className='btn btn-success'> Add amenity <i class="bi bi-patch-plus"></i></Link>
      </div>
        <div className='mt-3'>
        <table className='table'>
        <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
        </thead>
        <tbody>
            {data.map((pajisjet,index)=>{
               return  <tr key={index}>
                    <td>{pajisjet.id}</td>
                    <td>{pajisjet.name}</td>
                    <td>{
                    <img src={`http://localhost:3002/images/` + pajisjet.image} alt="" 
                    className='pajisjet_image'/>
                    }</td>
                    <td>{pajisjet.description}</td>
                    
                    <td>
                        <Link to={`/updateAmenties/`+ pajisjet.id} className='btn btn-primary btn-sm me-2'>Update  <i class="bi bi-pencil"></i></Link>
                        <button onClick={()=>handleDelete(pajisjet.id)} className='btn btn-sm btn-danger'>Delete <i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            })}
        </tbody>
        </table>
        </div>

    </div>
  )
}

export default MenaxhoAmenties