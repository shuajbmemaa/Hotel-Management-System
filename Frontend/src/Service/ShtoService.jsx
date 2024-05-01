import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ShtoService = () => {

    const[services,setServices]=useState({
        title:'',
        room_type_id:'',
        price_type:'',
        price:'',
        description:'',
    })

    const [roomT, setRoomT] = useState([]);


      const navigate=useNavigate();

    const handleSubmit= (e) =>{
        e.preventDefault();

        if (!services.title || !services.room_type_id || !services.price_type || !services.price || !services.description) {
            toast.warn("Ju lutem mbusheni të gjithë formën!");
            return;
          }

          axios.post('http://localhost:3002/shtoService', services)
            .then(res => {
                 console.log(res.data);
                 navigate('/service');
                 toast.success('Service u shtua me sukses');
      })
      .catch(err => console.log(err))

    }

    const handleChange=(e)=>{
        setServices({...services, [e.target.name]:e.target.value})
      }

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      
      <div className="form-border">
        <Link to="/service" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
            <h3 className="text-start">Add Service</h3>

        <div className='col-12'>
                <label for="inputTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputTitle" placeholder='Set title' autoComplete='off'
                onChange={handleChange} name='title' />
            </div>

            <div className="col-12">
            <label htmlFor="inputR" className="form-label">Room Type</label>
            <select className="form-control" id="inputR" onChange={handleChange} name='room_type_id'>
              <option value="">Choose Room</option>
              {roomT.map(roomm => (
                <option key={roomm.id} value={roomm.id}>{roomm.title}</option>
              ))}
            </select>
          </div>

          <div className='col-12'>
                <label for="inputPT" className="form-label">Price Type</label>
                <input type="text" className="form-control" id="inputPT" placeholder='Set price type' autoComplete='off'
                onChange={handleChange} name='price_type' />
            </div>

            <div className='col-12'>
                <label for="inputP" className="form-label">Price</label>
                <input type="number" className="form-control" id="inputP" placeholder='Set price' autoComplete='off'
                onChange={handleChange} name='price' />
            </div>

            <div className='col-12'>
                <label for="inputDescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="inputDescription" placeholder='Description...' autoComplete='off'
                onChange={handleChange} name='description' />
            </div>


            <div className="col-12">
                    <div className="text-center ">
                    <button type="submit" className="btn btn-dark" style={{ width: '50%' }}>Create</button>
                        </div>
                    </div>

        </form>
    </div>
    </div>
  )
}

export default ShtoService