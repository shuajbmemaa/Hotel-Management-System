import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const MenaxhoUseret = () => {

    const[data,setData]=useState([]);

    const handleDelete= (id)=>{
      if(window.confirm("A jeni i sigurte qe doni ta largoni kete perdorues ?")){
        axios.delete('http://localhost:3002/deleteUser/'+id)
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
        axios.get('http://localhost:3002/getUseret')
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
            <h3>Menaxhimi i Usereve</h3>
        </div>
        <div className="d-flex justify-content-end">
        <Link to="/krijoLlogari" className='btn btn-success'>Krijo nje llogari <i class="bi bi-patch-plus"></i></Link>
      </div>
        <div className='mt-3'>
        <table className='table'>
        <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Image</th>
                    <th>Gjinia</th>
                    <th>Actions</th>
                </tr>
        </thead>
        <tbody>
            {data.map((useret,index)=>{
               return  <tr key={index}>
                    <td>{useret.id}</td>
                    <td>{useret.name}</td>
                    <td>{useret.email}</td>
                    <td>{
                    <img src={`http://localhost:3002/images/` + useret.image} alt="" 
                    class='w-100 square h-100'/>
                    }</td>
                    <td>{useret.gender}</td>
                    <td>
                        <Link to={`/updateUser`+useret.id} className='btn btn-primary btn-sm me-2'>Update  <i class="bi bi-pencil"></i></Link>
                        <button onClick={()=>handleDelete(useret.id)} className='btn btn-sm btn-danger'>Delete <i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            })}
        </tbody>
        </table>
        </div>

    </div>
  )
}

export default MenaxhoUseret