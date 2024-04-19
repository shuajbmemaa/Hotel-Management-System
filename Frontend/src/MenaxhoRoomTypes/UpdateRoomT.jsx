import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaTimes } from 'react-icons/fa'; 
import '../form.css';

const UpdateRoomT = () => {
    const [data, setData] = useState({
        title:'',
        short_code:'',
        base_occupancy:'',
        higher_occupancy:'',
        extra_bed:'',
        kids:'',
        amenties_id:'',
        base_price:'',
        extra_bed_price:''
	})

    const navigate=useNavigate();
    const [amenties, setAmenties] = useState([]);

    
    const {id}=useParams();

    useEffect(()=>{
        axios.get('http://localhost:3002/getRoomT/'+id)
        .then(res => {
            setData({...data,
                title:res.data.Result[0].title,
                short_code:res.data.Result[0].short_code,
                base_occupancy:res.data.Result[0].base_occupancy,
                higher_occupancy:res.data.Result[0].higher_occupancy,
                extra_bed:res.data.Result[0].extra_bed,
                kids:res.data.Result[0].kids,
                amenties_id:res.data.Result[0].amenties_id,
                base_price:res.data.Result[0].base_price,
                extra_bed_price:res.data.Result[0].extra_bed_price,
              
            })
        })
        .catch(err => console.log(err))
    },[])

    useEffect(()=>{
        axios.get('http://localhost:3002/getAmenties')
        .then(res=>{
          if(res.data.Status === "Success"){
            setAmenties(res.data.Result)
          }else{
            toast.error("Erorr")
          }
        })
        .catch(err=>console.log(err))
        },[]) 

    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:3002/updateRoomT/'+id,data)
        .then(res =>{
            if(res.data.Status === "Success"){
            navigate('/menaxhoRoomT')
            toast.success("Update u realizua me sukses");
        }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <div className="form-border">
        <Link to="/menaxhoRoomT" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
            <h3 className="text-start">Update Room Type</h3>
    
                <div className='col-12'>
                    <label for="inputTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="inputTitle" placeholder='Title' autoComplete='off'
                    onChange={e => setData({ ...data, title: e.target.value })} value={data.title} />
                </div>
                <div className='col-12'>
                    <label for="inputShortC" className="form-label">Short Code</label>
                    <input type="text" className="form-control" id="inputShortC" placeholder='Short Code' autoComplete='off'
                    onChange={e => setData({ ...data, short_code: e.target.value })} value={data.short_code} />
                </div>
                <div className='col-12'>
                    <label for="inputBaseO" className="form-label">Base Occupancy</label>
                    <input type="number" className="form-control" id="inputBaseO" placeholder='Base Occupancy' autoComplete='off'
                    onChange={e => setData({ ...data, base_occupancy: e.target.value })} value={data.base_occupancy} />
                </div>
                <div className='col-12'>
                    <label for="inputHighO" className="form-label">Higher Occupancy</label>
                    <input type="number" className="form-control" id="inputHighO" placeholder='Higher Occupancy' autoComplete='off'
                    onChange={e => setData({ ...data, higher_occupancy: e.target.value })}value={data.higher_occupancy} />
                </div>
    
                <div className='col-12'>
                    <label for="inputExtraB" className="form-label">Extra Bed</label>
                    <input type="number" className="form-control" id="inputExtraB" placeholder='Extra Bed' autoComplete='off'
                    onChange={e => setData({ ...data, extra_bed: e.target.value })} value={data.extra_bed} />
                </div>
    
                <div className='col-12'>
                    <label for="inputKids" className="form-label">Kids</label>
                    <input type="number" className="form-control" id="inputKids" placeholder='Kids' autoComplete='off'
                    onChange={e => setData({ ...data, kids: e.target.value })} value={data.kids} />
                </div>
                <div class="col-12">
              <label for="inputA" class="form-label">Amentie</label>
              <select
                className="form-control"
                id="inputA"
                onChange={e => setData({ ...data, amenties_id: e.target.value })} value={data.amenties_id} 
                >
                
                 <option value="">Choose Amentie</option>
                 {amenties.map(amentie =>(
                    <option key={amentie.id} value={amentie.id}>{amentie.name}</option>
                 ))}
                 </select>
            </div>
    
            <div className='col-12'>
                    <label for="inputBaseP" className="form-label">Base Price</label>
                    <input type="number" className="form-control" id="inputBaseP" placeholder='Base Price' autoComplete='off'
                    onChange={e => setData({ ...data, base_price: e.target.value })} value={data.base_price} />
                </div>
                <div className='col-12'>
                    <label for="inputExtraBP" className="form-label">Extra Bed Price</label>
                    <input type="number" className="form-control" id="inputExtraBP" placeholder='Extra Bed Price' autoComplete='off'
                    onChange={e => setData({ ...data, extra_bed_price: e.target.value })} value={data.extra_bed_price} />
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

export default UpdateRoomT

