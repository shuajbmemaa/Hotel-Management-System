import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa';
import '../form.css';

const InsertHouseKeeping = () => {

    const [houseKeeping,setHouseKeeping]=useState({
        housekeeping_status_id:'',
        room_id:'',
        hall_id:'',
        user_id:'',
        date:''
    })

    const navigate=useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();
        // if(!houseKeeping.housekeeping_status_id || !houseKeeping.room_id || !houseKeeping.hall_id
        //     || houseKeeping.user_id || houseKeeping.date
        // ){
        //     toast.warn("Plotesone te gjithe formen !")
        //     return;
        // }

        axios.post('http://localhost:3002/krijoHouseKeeping',houseKeeping)
        .then(res=>{
            navigate('/houseKeeping');
            toast.success("U krijua me sukses");
        })
        .catch(err=>console.log(err))
    }

    const[data,setData]=useState([])

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

      const [room,setRoom]=useState([])

      useEffect(()=>{
        axios.get('http://localhost:3002/getRooms')
        .then(res=>{
          if(res.data.Status === "Success"){
            setRoom(res.data.Result)
          }else{
            toast.error("Erorr")
          }
        })
        .catch(err=>console.log(err))
        },[])


        const[halla,setHalls]=useState([]);

        useEffect(()=>{
            axios.get('http://localhost:3002/getHall')
            .then(res=>{
              if(res.data.Ok === "OK"){
                setHalls(res.data.Halls)
              }else{
                toast.error("Error")
              }
            }).catch(err=>console.log(err))
          })

          const[user,setUser]=useState([]);

          useEffect(() => {
            axios.get('http://localhost:3002/getUseret')
                .then(res => {
                    if (res.data.Status === "Success") {
                        setUser(res.data.Result);
                    } else {
                        toast.error("Error");
                    }
                })
                .catch(err => console.log(err));
        }, []);

        const handleChange=(e)=>{
            setHouseKeeping({...houseKeeping,[e.target.name]:e.target.value})
        }


  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      
      <div className="form-border">
        <Link to="/houseKeeping" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
            <h3 className="text-start">Add HouseKeeping</h3>

        <div class="col-12">
          <label for="inputFK" class="form-label">House Keeping Status</label>
          <select
            className="form-control"
            id="inputFK"
            name='housekeeping_status_id'
            onChange={handleChange}
          >
             <option value="">Choose House Keeping Status</option>
             {data.map(house =>(
                <option key={house.id} value={house.id}>{house.title}</option>
             ))}
             </select>
        </div>

        <div class="col-12">
          <label for="inputFK2" class="form-label">Room</label>
          <select
            className="form-control"
            id="inputFK2"
            name='room_id'
            onChange={handleChange}
          >
             <option value="">Choose Room</option>
             {room.map(rooms =>(
                <option key={rooms.id} value={rooms.id}>{rooms.id}</option>
             ))}
             </select>
        </div>

        <div class="col-12">
          <label for="inputFK3" class="form-label">Hall</label>
          <select
            className="form-control"
            id="inputFK3"
            name='hall_id'
            onChange={handleChange}
          >
             <option value="">Choose Hall</option>
             {halla.map(halls =>(
                <option key={halls.id} value={halls.id}>{halls.id}</option>
             ))}
             </select>
        </div>

        <div class="col-12">
          <label for="inputFK4" class="form-label">Employee</label>
          <select
            className="form-control"
            id="inputFK4"
            name='user_id'
            onChange={handleChange}
          >
             <option value="">Choose Employee</option>
             {user.map(employee =>(
                <option key={employee.id} value={employee.id}>{employee.name}</option>
             ))}
             </select>
        </div>

        <div className="col-12">
              <label htmlFor="inputDate" className="form-label">Date</label>
              <input type="date" className="form-control" id="inputDate" name='date'
               onChange={handleChange}/>
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

export default InsertHouseKeeping