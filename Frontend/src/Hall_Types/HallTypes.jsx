import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './halltypes.css'

const HallTypes = () => {

  const [hallTypes,setHallTypes]=useState([])
  const [amenties,setAmenties]=useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3002/getAmenties')
    .then(res=>{
      if(res.data.Status === "Success"){
        setAmenties(res.data.Result)
      }else{
        toast.error("Erorr")
      }
    })
    .catch(err=>console.log(err))
    },[]);

  useEffect(()=>{
    axios.get('http://localhost:3002/getHallTypes')
    .then(res=>{
        if(res.data.Status === "Success"){
          setHallTypes(res.data.Result)
        }else{
          toast.error("Gabim");
        }
      }
    ).catch(err => console.log(err))
  })

  const handleDelete= (id)=>{
    if(window.confirm("A jeni i sigurte qe doni ta largoni kete Hall Type ?")){
      axios.delete('http://localhost:3002/deleteHallType/'+id)
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
 
  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
            <h3>Hall Types</h3>
      </div>
      <div className='d-flex justify-content-end'>
          <Link to='/insertHallTypes' className='btn btn-success'>Create <i class="bi bi-patch-plus"></i></Link>
      </div>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
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
            {hallTypes.map((hallType,index)=>{
               return  <tr key={index}>
                    <td>{hallType.id}</td>
                    <td>{hallType.title}</td>
                    <td>{hallType.short_code}</td>
                    <td>{hallType.baseOccupancy}</td>
                    <td>{hallType.higherOccupancy}</td>
                    <td>{hallType.amenties}</td>
                    <td>{hallType.basePrice}</td>
                    <td>{
                    <img src={`http://localhost:3002/images/` + hallType.image} alt="" 
                    className='hallTypes'/>
                    }</td>
                    <td>
                        <Link to={`/updateHallTypes/`+hallType.id} className='btn btn-primary btn-sm me-2'>Update  <i class="bi bi-pencil"></i></Link>
                        <button onClick={()=>handleDelete(hallType.id)} className='btn btn-sm btn-danger'>Delete <i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            })}
        </tbody>
        </table>

      </div>

    </div>
  )
}

export default HallTypes