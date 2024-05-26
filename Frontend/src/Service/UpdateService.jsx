import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaTimes } from 'react-icons/fa'; 


const UpdateService = () => {
  const [data, setData] = useState({
        title:'',
        room_type_id:'',
        price_type:'',
        price:'',
        description:'',
})

const navigate=useNavigate();
const [roomT, setRoomT] = useState([]);


const {id}=useParams();

useEffect(()=>{
    axios.get('http://localhost:3002/getService/'+id)
    .then(res => {
        setData({...data,
            title:res.data.Result[0].title,
            room_type_id:res.data.Result[0].room_type_id,
            price_type:res.data.Result[0].price_type,
            price:res.data.Result[0].price,
            description:res.data.Result[0].description
        })
    })
    .catch(err => console.log(err))
},[])

useEffect(()=>{
  axios.get('http://localhost:3002/getRoomT')
  .then(res=>{
    if(res.data.Status === "Success"){
      setRoomT(res.data.Result)
    }else{
      toast.error("Erorr")
    }
  })
  .catch(err=>console.log(err))
  },[]) 


const handleSubmit=(event)=>{
    event.preventDefault();
    axios.put('http://localhost:3002/updateService/'+id,data)
    .then(res =>{
        if(res.data.Status === "Success"){
        navigate('/service')
        toast.success("Update u realizua me sukses");
    }
    })
    .catch(err => console.log(err))
}

return (
    <div className='d-flex flex-column align-items-center pt-4'>
      
      <div className="form-border">
        <Link to="/service" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
            <h3 className="text-start">Update Service</h3>

        <div className='col-12'>
                <label for="inputTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputTitle" placeholder='Set title' autoComplete='off'
                onChange={e => setData({ ...data, title: e.target.value })}  value={data.title} />
            </div>

            <div className="col-12">
            <label htmlFor="inputR" className="form-label">Room Type</label>
            <select className="form-control" id="inputR"  onChange={e => setData({ ...data, room_type_id: e.target.value })}  value={data.room_type_id} >
              <option value="">Choose Room</option>
              {roomT.map(roomm => (
                <option key={roomm.id} value={roomm.id}>{roomm.title}</option>
              ))}
            </select>
          </div>

          <div className='col-12'>
                <label for="inputPT" className="form-label">Price Type</label>
                <input type="text" className="form-control" id="inputPT" placeholder='Set price type' autoComplete='off'
                 onChange={e => setData({ ...data, price_type: e.target.value })}  value={data.price_type} />
            </div>

            <div className='col-12'>
                <label for="inputP" className="form-label">Price</label>
                <input type="number" className="form-control" id="inputP" placeholder='Set price' autoComplete='off'
                onChange={e => setData({ ...data, price: e.target.value })}  value={data.price} />
            </div>

            <div className='col-12'>
                <label for="inputDescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="inputDescription" placeholder='Description...' autoComplete='off'
                onChange={e => setData({ ...data, description: e.target.value })}  value={data.description} />
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

export default UpdateService

