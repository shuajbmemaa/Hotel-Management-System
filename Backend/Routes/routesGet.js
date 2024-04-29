import express from 'express'
import db from '../DB/db.js';

const getRoutes=express.Router();

getRoutes.get('/logout', (req, res) => {
    req.session.destroy();
    return res.json("Success");
  })

  getRoutes.get('/', (req, res) => {
    if (req.session.role) {
      return res.json({ valid: true, role: req.session.role })
    } else {
      return res.json({ valid: false })
    }
  })

  getRoutes.get('/getUseret',(req,res)=>{
    const sql = "Select id,name,email,img_url,gender,date_of_birth from users";   
    db.query(sql,(err,result)=>{
      if(err) return res.status(400).json({message:"Gabim"})
      return res.status(200).json({Status:"Success",Result:result})
    })
   })

   getRoutes.get('/getAmenties',(req,res)=>{
    const sql = "Select id,name,image,description from amenties";   
    db.query(sql,(err,result)=>{
      if(err) return res.status(400).json({message:"Gabim"})
      return res.status(200).json({Status:"Success",Result:result})
    })
   })

   getRoutes.get('/getUsers/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "Select name,email,role,img_url,date_of_birth from users where id=?";   
    db.query(sql, [id], (err, result)=>{
      if(err) return res.status(400).json({message:"Gabim"})
      return res.status(200).json({Status:"Success",Result:result})
    })
   })

   getRoutes.get('/getAmenties/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "Select name,description from amenties where id=?";   
    db.query(sql, [id], (err, result)=>{
      if(err) return res.status(400).json({message:"Gabim"})
      return res.status(200).json({Status:"Success",Result:result})
    })
   })

   getRoutes.get('/getFloors',(req,res)=>{
    const sql = "Select id,name,floor_number,description from floors";   
    db.query(sql,(err,result)=>{
      if(err) return res.status(400).json({message:"Gabim"})
      return res.status(200).json({Status:"Success",Result:result})
    })
   })

   getRoutes.get('/getFloor/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "Select name,floor_number,description from floors where id=?";   
    db.query(sql, [id], (err, result)=>{
      if(err) return res.status(400).json({message:"Gabim"})
      return res.status(200).json({Status:"Success",Result:result})
    })
   })
   
   getRoutes.get('/getHallTypes/:id',(req,res)=>{
    const id = req.params.id;
    const sql = "Select title,short_code,amenties_id,basePrice from hall_type where id=?";   
    db.query(sql, [id], (err, result)=>{
      if(err) return res.status(400).json({message:"Gabim"})
      return res.status(200).json({Status:"Success",Result:result})
    })
   })

   getRoutes.get('/getHallTypes',(req,res)=>{
    const sql="Select hall_type.id,hall_type.title,hall_type.short_code,hall_type.baseOccupancy,hall_type.higherOccupancy,amenties.name as amenties,hall_type.basePrice,hall_type.image from hall_type INNER JOIN amenties on hall_type.amenties_id=amenties.id "
    db.query(sql,(err,result)=>{
      if(err) return res.status(400).json({Error:"Gabim ne Server"})
      return res.json({Status:"Success",Result:result});
    })
   })

   getRoutes.get('/getRoomT',(req,res)=>{
    const sql = "Select room_types.id,room_types.title,room_types.short_code,amenties.name as amentie from room_types inner join amenties on amenties.id=room_types.amenties_id";
    db.query(sql,(err,result)=>{
      if(err) return res.status(400).json({message:"Gabim"})
      return res.status(200).json({Status:"Success",Result:result})
    })
  })  

  getRoutes.get('/getRooms',(req,res)=>{
    const sql = "Select room.id,room.room_number,room_types.title as roomm,floors.name as floors from floors inner join room on floors.id=room.floor_id inner join room_types on room.room_type_id=room_types.id   ";
    db.query(sql,(err,result)=>{
      if(err) return res.status(400).json(err)
      return res.status(200).json({Status:"Success",Result:result})
    })
  })  

  
getRoutes.get('/getRoomT/:id',(req,res)=>{
 const id = req.params.id;
 const sql = "Select title,short_code,base_occupancy,higher_occupancy,extra_bed,kids,amenties_id,base_price,extra_bed_price from room_types where id=?";   
 db.query(sql, [id], (err, result)=>{
   if(err) return res.status(400).json({message:"Gabim"})
   return res.status(200).json({Status:"Success",Result:result})
 })
})


getRoutes.get('/getRooms/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "Select floor_id,room_type_id,room_number from room where id=?";   
  db.query(sql, [id], (err, result)=>{
    if(err) return res.status(400).json({message:"Gabim"})
    return res.status(200).json({Status:"Success",Result:result})
  })
 })

 getRoutes.get('/getHall',(req,res)=>{
  const sql="Select hall.id,floors.name as emri,hall_type.title as halltype,hall.hall_number from hall_type INNER JOIN hall on hall_type.id=hall.hall_type_id INNER JOIN floors on floors.id=hall.floor_id ";
  db.query(sql,(err,result)=>{
    if(err) return res.status(400).json({Error:"Gabim ne Server"})
    return res.json({Ok:"OK",Halls:result});
  })
 })

 getRoutes.get('/getHall/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "Select floor_id,hall_type_id,hall_number from hall where id=?";   
  db.query(sql, [id], (err, result)=>{
    if(err) return res.status(400).json({message:"Gabim"})
    return res.status(200).json({Status:"Success",Result:result})
  })
 })

 getRoutes.get('/api/profile', (req, res) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  const userId = req.query.userId;
  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(results[0]);
    }
  });
});

export default getRoutes;

