import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MenaxhoRoom = ({}) => {
  const[data,setData]=useState([]);
  const [searchTerm, setSearchTerm] = useState('');


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
            axios.delete(`http://localhost:3002/deleteRoom/${id}`)
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
      axios.get('http://localhost:3002/getRooms')
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
          <h3>Rooms</h3>
      </div>
      <div className="d-flex justify-content-end">
      <Link to="/shtoRoom" className='btn btn-light me-2'><i class="bi bi-plus"></i>Add New Room</Link>
      <Link to="/shtoExcelFile" className='btn btn-light'><i class="bi bi-plus"></i>Import from Excel</Link>
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
                  <th>Room Number</th>
                  <th>Room Type</th>
                  <th>Floor Number</th>
                  <th>Actions</th>
              </tr>
      </thead>
      <tbody>
        
          {data.map((rooms,index)=>{
             return  <tr key={index}>
                  <td>{rooms.id}</td>
                  <td>{rooms.room_number}</td>
                  <td>{rooms.roomm}</td>
                  <td>{rooms.floors}</td>
                  <td>
                      <Link to={`/updateRoom/`+rooms.id} className='btn btn-primary btn-sm me-2'>Update  <i class="bi bi-pencil"></i></Link>
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

export default MenaxhoRoom