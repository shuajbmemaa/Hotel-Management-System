import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaTimes } from 'react-icons/fa'; 
import '../form.css';

const UpdateRoom = () => {
  const [data, setData] = useState({
    floor_id: '',
    room_type_id: '',
    room_number: ''
})

const navigate=useNavigate();
const [floor, setFloor] = useState([]);
const [roomT, setRoomT] = useState([]);


const {id}=useParams();

useEffect(()=>{
    axios.get('http://localhost:3002/getRooms/'+id)
    .then(res => {
        setData({...data,
            floor_id:res.data.Result[0].floor_id,
            room_type_id:res.data.Result[0].room_type_id,
            room_number:res.data.Result[0].room_number,
        })
    })
    .catch(err => console.log(err))
},[])

useEffect(()=>{
  axios.get('http://localhost:3002/getFloors')
  .then(res=>{
    if(res.data.Status === "Success"){
      setFloor(res.data.Result)
    }else{
      toast.error("Erorr")
    }
  })
  .catch(err=>console.log(err))
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
    axios.put('http://localhost:3002/updateRoom/'+id,data)
    .then(res =>{
        if(res.data.Status === "Success"){
        navigate('/menaxhoRoom')
        toast.success("Update u realizua me sukses");
    }
    })
    .catch(err => console.log(err))
}

return (
    <div className='d-flex flex-column align-items-center pt-4'>
       <div className="form-border">
        <Link to="/menaxhoRoom" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
            <h3 className="text-start">Update Room</h3>

    <div class="col-12">
      <label for="inputF" class="form-label">Floor</label>
      <select
        className="form-control"
        id="inputF"
        onChange={e => setData({ ...data, floor_id: e.target.value })}  value={data.floor_id} 
        >
         <option value="">Choose Floor</option>
         {floor.map(floors =>(
            <option key={floors.id} value={floors.id}>{floors.name}</option>
         ))}
         </select>
    </div>
    <div class="col-12">
      <label for="inputR" class="form-label">Room Type</label>
      <select
        className="form-control"
        id="inputR"
        onChange={e => setData({ ...data, room_type_id: e.target.value })} value={data.room_type_id} 
        >
         <option value="">Choose Room</option>
         {roomT.map(roomm =>(
            <option key={roomm.id} value={roomm.id}>{roomm.title}</option>
         ))}
         </select>
    </div>
        <div className='col-12'>
            <label for="inputRoom" className="form-label">Room Number</label>
            <input type="number" className="form-control" id="inputRoom" placeholder='Room Number' autoComplete='off'
            onChange={e => setData({ ...data, room_number: e.target.value })} value={data.room_number} />
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


export default UpdateRoom

