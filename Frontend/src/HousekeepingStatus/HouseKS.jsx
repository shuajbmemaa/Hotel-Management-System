import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const HouseKS = ({}) => {
  const[data,setData]=useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const handleDelete= (id)=>{
    if(window.confirm("Are you sure you want to remove this Housekeeping status?")){
      axios.delete('http://localhost:3002/deleteHouseKs/'+id)
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
      axios.get('http://localhost:3002/getHouseKS')
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
          <h3>Housekeeping Status</h3>
      </div>
      <div className="d-flex justify-content-end">
      <Link to="/insertHouseKeppingS" className='btn btn-light'><i class="bi bi-plus"></i>Add New Housekeeping status</Link>
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
                  <th>Title</th>
                  <th>Short Decription</th>
                  <th>Actions</th>
              </tr>
      </thead>
      <tbody>
        
          {data.map((houseS,index)=>{
             return  <tr key={index}>
                  <td>{houseS.id}</td>
                  <td>{houseS.title}</td>
                  <td>{houseS.short_description}</td>
                  <td>
                      <Link to={`/updateHouseKeppingS/`+houseS.id} className='btn btn-primary btn-sm me-2'>Update<i class="bi bi-pencil"></i></Link>
                      <button onClick={()=>handleDelete(houseS.id)} className='btn btn-sm btn-danger'>Delete<i class="bi bi-trash3"></i></button>
                  </td>
              </tr>
          })}
      </tbody>
      </table>
      </div>

  </div>
)
}
export default HouseKS
