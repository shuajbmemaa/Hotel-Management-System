import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const InsertRoom = ({}) => {
  const [room, setRoom] = useState({
    floor_id: '',
    room_type_id: '',
    room_number: ''
  });

 
  const navigate = useNavigate();
  const [floor, setFloor] = useState([]);
  const [roomT, setRoomT] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!room.floor_id || !room.room_type_id || !room.room_number) {
      toast.warn("Ju lutem mbusheni të gjithë formën!");
      return;
    }

  


    axios.post('http://localhost:3002/shtoRoom', room)
    .then(res=>{
        console.log(res.data);
        navigate('/menaxhoRoom');
        toast.success('Dhoma u shtua me sukses');
    })
    .catch(err=>console.log(err))
}

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
    
  return (
    <div className='d-flex flex-column align-items-center pt-4'>
    <h2>Shto Dhome</h2>
    <form className="row g-3 w-50" onSubmit={handleSubmit}>


    <div class="col-12">
      <label for="inputF" class="form-label">Floor</label>
      <select
        className="form-control"
        id="inputF"
        onChange={e => setRoom({ ...room, floor_id: e.target.value })}
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
        onChange={e => setRoom({ ...room, room_type_id: e.target.value })}
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
            onChange={e => setRoom({ ...room, room_number: e.target.value })} />
        </div>
       

        <div class="col-12">
            <button type="submit" class="btn btn-primary">Krijo</button>
            <Link to="/menaxhoRoom" className='btn btn-success ms-3'>Kthehu</Link>
        </div>




    </form>
</div>
  )
}
export default InsertRoom