import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';


const MenaxhoRoomT = () => {

    const[data,setData]=useState([]);

    const handleDelete= (id)=>{
      if(window.confirm("A jeni i sigurte qe doni ta largoni kete dhome ?")){
        axios.delete('http://localhost:3002/deleteRoomT/'+id)
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
        axios.get('http://localhost:3002/getRoomT')
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
            <h3>Menaxhimi i Dhomave</h3>
        </div>
        <div className="d-flex justify-content-end">
        <Link to="/shtoRoomT" className='btn btn-success'>Krijo nje dhome <i class="bi bi-patch-plus"></i></Link>
      </div>
        <div className='mt-3'>
        <table className='table'>
        <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Short Code</th>
                    <th>Amenties</th>
                    <th>Actions</th>
                </tr>
        </thead>
        <tbody>
            {data.map((rooms,index)=>{
               return  <tr key={index}>
                    <td>{rooms.id}</td>
                    <td>{rooms.title}</td>
                    <td>{rooms.short_code}</td>
                    <td>{rooms.amentie}</td>
                    <td>
                        <Link to={`/updateRoomT/`+rooms.id} className='btn btn-primary btn-sm me-2'>Update  <i class="bi bi-pencil"></i></Link>
                        <button onClick={()=>handleDelete(rooms.id)} className='btn btn-sm btn-danger'>Delete <i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            })}
        </tbody>
        </table>
        </div>

    </div>
  )
}

export default MenaxhoRoomT