import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaTimes } from 'react-icons/fa'; 
import '../form.css';

const UpdateHouseKS = () => {
  const [data, setData] = useState({
    title: '',
    short_description: ''
})

const navigate=useNavigate();

const {id}=useParams();

useEffect(()=>{
    axios.get('http://localhost:3002/getHouseeKS/'+id)
    .then(res => {
        setData({...data,
            title:res.data.Result[0].title,
            short_description:res.data.Result[0].short_description
        })
    })
    .catch(err => console.log(err))
},[])

const handleSubmit=(event)=>{
    event.preventDefault();
    axios.put('http://localhost:3002/updateHouseKS/'+id,data)
    .then(res =>{
        if(res.data.Status === "Success"){
        navigate('/houseKeppingS')
        toast.success("Update u realizua me sukses!");
    }
    })
    .catch(err => console.log(err))
}

return (
    <div className='d-flex flex-column align-items-center pt-4'>
      
    <div className="form-border">
      <Link to="/houseKeppingS" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
      <form className="row g-3 w-150" onSubmit={handleSubmit}>
          <h3 className="text-start">Update Housekeeping Status</h3>

        <div className='col-12'>
          <label htmlFor="inputTitle" className="form-label">Title</label>
          <input type="text" className="form-control" id="inputTitle" placeholder='Title' autoComplete='off'
            onChange={e => setData({ ...data, title: e.target.value })}  value={data.title} />
        </div>
        <div className='col-12'>
          <label htmlFor="inputDesc" className="form-label">Short Description</label>
          <input type="text" className="form-control" id="inputDesc" placeholder='Title' autoComplete='off'
            onChange={e => setData({ ...data, short_description: e.target.value })} value={data.short_description} />
        </div>
        <div className="col-12">
                  <div className="text-center ">
                  <button type="submit" className="btn btn-dark" style={{ width: '50%' }}>Update</button>
                      </div>
                  </div>
      </form>
    </div>
  </div>
)
}

export default UpdateHouseKS
