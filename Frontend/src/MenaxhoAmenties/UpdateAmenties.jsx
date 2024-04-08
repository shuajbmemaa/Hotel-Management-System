import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const UpdateAmenties = () => {
    const [data, setData] = useState({
		name: '',
		description: ''
	})

    const navigate=useNavigate();
    
    const {id}=useParams();

    useEffect(()=>{
        axios.get('http://localhost:3002/getAmenties/'+id)
        .then(res => {
            setData({...data,
                name:res.data.Result[0].name,
                description:res.data.Result[0].description,
            })
        })
        .catch(err => console.log(err))
    },[])

    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:3002/UpdateAmenties/'+id,data)
        .then(res =>{
            if(res.data.Status === "Success"){
            navigate('/menaxhoAmenties')
            toast.success("Update u realizua me sukses");
        }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
			<h2>Update User</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})} value={data.name}/>
				</div>

                <div class="col-12">
					<label for="inputName" class="form-label">Description</label>
					<input type="text" class="form-control" id="inputDescription" placeholder='Enter Description' autoComplete='off'
					onChange={e => setData({...data, description: e.target.value})} value={data.description}/>
				</div>
              
           
				<div class="d-flex justify-content-center">
					<button type="submit" class="btn btn-primary">Update</button>
                    <Link to="/menaxhoAmenties" className='btn btn-success ms-3'>Kthehu</Link>
				</div>
			</form>
		</div>
  )
}

export default UpdateAmenties