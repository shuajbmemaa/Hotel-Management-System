import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';


const MenaxhoRoomT = () => {

    const[data,setData]=useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete= (id)=>{
      if(window.confirm("Are you sure you want to remove this Room Type?")){
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
        <div className='d-flex justify-content-right'>
            <h3>Room Types</h3>
        </div>
        <div className="d-flex justify-content-end">
        <Link to="/shtoRoomT" className='btn btn-light'><i class="bi bi-plus"></i>Add New Room Type</Link>
      </div>
        <div className='mt-3'>
        <input
                    type="text"
                    className="form-control shadow"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
        <table className='table mt-3'>
        <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Short Code</th>
                    <th>Amenties</th>
                    <th>Actions</th>
                </tr>
        </thead>
        <tbody>
        {data.filter(rooms => {
                            if (searchTerm === '') {
                                return rooms;
                            } else if (rooms.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return rooms;
                            }
                            return false;
                        }).map((rooms,index)=>{
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