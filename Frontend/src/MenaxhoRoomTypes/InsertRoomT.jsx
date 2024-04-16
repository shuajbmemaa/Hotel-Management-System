import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


const InsertRoomT = () => {
    
    const [room,setRoom]=useState({
        title:'',
        short_code:'',
        base_occupancy:'',
        higher_occupancy:'',
        extra_bed:'',
        kids:'',
        amenties_id:'',
        base_price:'',
        extra_bed_price:'',
        image:''

    })

    const navigate=useNavigate();
    const [amenties, setAmenties] = useState([]);

    const handleSubmit=(event)=>{
        event.preventDefault();

        
        if(!room.title || !room.short_code || !room.base_occupancy
        ||!room.higher_occupancy || !room.extra_bed || !room.kids
        || !room.amenties_id || !room.base_price || !room.extra_bed_price
        || !room.image ){
            toast.warn("Ju lutem mbusheni te gjithe formen !");
            return;
        }

        const formData=new FormData();
        formData.append("title",room.title);
        formData.append("short_code",room.short_code);
        formData.append("base_occupancy",room.base_occupancy);
        formData.append("higher_occupancy",room.higher_occupancy);
        formData.append("extra_bed",room.extra_bed);
        formData.append("kids",room.kids);
        formData.append("amenties_id",room.amenties_id);
        formData.append("base_price",room.base_price);
        formData.append("extra_bed_price",room.extra_bed_price);
        formData.append("image",room.image);

        console.log("Vlerat : " ,room);

        axios.post('http://localhost:3002/krijoDhome',formData)
        .then(res=>{
            console.log(res.data);
            navigate('/menaxhoRoomT');
            toast.success('Dhoma u shtua me sukses');
        })
        .catch(err=>console.log(err))
    }

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

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
        <h2>Shto Dhome</h2>
        <form className="row g-3 w-50" onSubmit={handleSubmit}>


            <div className='col-12'>
                <label for="inputTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="inputTitle" placeholder='Title' autoComplete='off'
                onChange={e => setRoom({ ...room, title: e.target.value })} />
            </div>
            <div className='col-12'>
                <label for="inputShortC" className="form-label">Short Code</label>
                <input type="text" className="form-control" id="inputShortC" placeholder='Short Code' autoComplete='off'
                onChange={e => setRoom({ ...room, short_code: e.target.value })} />
            </div>
            <div className='col-12'>
                <label for="inputBaseO" className="form-label">Base Occupancy</label>
                <input type="number" className="form-control" id="inputBaseO" placeholder='Base Occupancy' autoComplete='off'
                onChange={e => setRoom({ ...room, base_occupancy: e.target.value })} />
            </div>
            <div className='col-12'>
                <label for="inputHighO" className="form-label">Higher Occupancy</label>
                <input type="number" className="form-control" id="inputHighO" placeholder='Higher Occupancy' autoComplete='off'
                onChange={e => setRoom({ ...room, higher_occupancy: e.target.value })} />
            </div>

            <div className='col-12'>
                <label for="inputExtraB" className="form-label">Extra Bed</label>
                <input type="number" className="form-control" id="inputExtraB" placeholder='Extra Bed' autoComplete='off'
                onChange={e => setRoom({ ...room, extra_bed: e.target.value })} />
            </div>

            <div className='col-12'>
                <label for="inputKids" className="form-label">Kids</label>
                <input type="number" className="form-control" id="inputKids" placeholder='Kids' autoComplete='off'
                onChange={e => setRoom({ ...room, kids: e.target.value })} />
            </div>
            <div class="col-12">
          <label for="inputA" class="form-label">Amentie</label>
          <select
            className="form-control"
            id="inputA"
            onChange={e => setRoom({ ...room, amenties_id: e.target.value })}
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
                onChange={e => setRoom({ ...room, base_price: e.target.value })} />
            </div>
            <div className='col-12'>
                <label for="inputExtraBP" className="form-label">Extra Bed Price</label>
                <input type="number" className="form-control" id="inputExtraBP" placeholder='Extra Bed Price' autoComplete='off'
                onChange={e => setRoom({ ...room, extra_bed_price: e.target.value })} />
            </div>
            <div class="col-12 mb-3">
              <label class="form-label" for="inputGroupFile01">Select Image</label>
              <input type="file" class="form-control" id="inputGroupFile01"
                onChange={e => setRoom({ ...room, image: e.target.files[0] })} />
            </div>

        

            <div class="col-12">
                <button type="submit" class="btn btn-primary">Krijo</button>
                <Link to="/menaxhoRoomT" className='btn btn-success ms-3'>Kthehu</Link>
            </div>




        </form>
    </div>
  )
}

export default InsertRoomT