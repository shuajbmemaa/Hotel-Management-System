import express from 'express'
import db from '../DB/db.js'
import path from 'path';
import multer from 'multer';


const putRoutes=express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

putRoutes.put('/updateAmenties/:id',(req,res)=>{
    const id=req.params.id;
    const {name,description}=req.body;
    const sql="Update amenties set name=?,description=? where id = ?" ;
    db.query(sql, [name,description,id], (err, result) => {
      if (err) return res.json({ Error: "Error when updating in sql" })
      return res.json({ Status: "Success", Result: result })
    })
  })

  putRoutes.put('/updateUsers/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;

    const name=req.body.name;
    const email = req.body.email;
    const role = req.body.role;
    const date_of_birth = req.body.date_of_birth;

    let img_url = req.file ? req.file.filename : null;

    if (!req.file) {

      const sqlGetImage = "SELECT img_url FROM users WHERE id = ?";
      db.query(sqlGetImage, [id], (err, result) => {
          if (err) return res.json(err);
          img_url = result[0].img_url;
  
          const sqlUpdate = "UPDATE users SET name=?, email=?, role=?, img_url=?, date_of_birth=? WHERE id = ?";
          db.query(sqlUpdate, [name, email, role, img_url, date_of_birth, id], (err, result) => {
              if (err) return res.json(err);
              return res.json({ Status: "Success", Result: result });
          });
      });
  } else {
      const sqlUpdate = "UPDATE users SET name=?, email=?, role=?, img_url=?, date_of_birth=? WHERE id = ?";
      db.query(sqlUpdate, [name, email, role, img_url, date_of_birth, id], (err, result) => {
          if (err) return res.json(err);
          return res.json({ Status: "Success", Result: result });
    });
}});


  putRoutes.put('/updateFloors/:id',(req,res)=>{
    const id=req.params.id;
    const {name,floor_number,description}=req.body;
    const sql="Update floors set name=?,floor_number=?,description=? where id = ?" ;
    db.query(sql, [name,floor_number,description,id], (err, result) => {
      if (err) return res.json({ Error: "Error when updating in sql" })
      return res.json({ Status: "Success", Result: result })
    })
  })

  putRoutes.put('/updateHallTypes/:id',(req,res)=>{
    const id=req.params.id;
    const {title,short_code,amenties_id,basePrice}=req.body;
    const sql="Update hall_type set title=?,short_code=?,amenties_id=?,basePrice=? where id = ?" ;
    db.query(sql, [title,short_code,amenties_id,basePrice,id], (err, result) => {
      if (err) return res.json({ Error: "Error when updating in sql" })
      return res.json({ Status: "Success", Result: result })
    })
  })

  putRoutes.put('/updateRoomT/:id',(req,res)=>{
    const id=req.params.id;
    const {title,short_code,base_occupancy,higher_occupancy,extra_bed,kids,amenties_id,base_price,extra_bed_price}=req.body;
    const sql="Update room_types set title=?,short_code=?,base_occupancy=?,higher_occupancy=?,extra_bed=?,kids=?,amenties_id=?,base_price=?,extra_bed_price=? where id = ?" ;
    db.query(sql, [title,short_code,base_occupancy,higher_occupancy,extra_bed,kids,amenties_id,base_price,extra_bed_price,id], (err, result) => {
      if (err) return res.json({ Error: "Error when updating in sql" })
      return res.json({ Status: "Success", Result: result })
    })
  })

  putRoutes.put('/updateRoom/:id',(req,res)=>{
    const id=req.params.id;
    const {floor_id,room_type_id,room_number}=req.body;
    const sql="Update room set floor_id=?,room_type_id=?,room_number=? where id = ?" ;
    db.query(sql, [floor_id,room_type_id,room_number,id], (err, result) => {
      if (err) return res.json({ Error: "Error when updating in sql" })
      return res.json({ Status: "Success", Result: result })
    })
  })

  putRoutes.put('/updateHall/:id',(req,res)=>{
    const id=req.params.id;
    const {floor_id,hall_type_id,hall_number}=req.body;
    const sql="Update hall set floor_id=?,hall_type_id=?,hall_number=? where id = ?" ;
    db.query(sql, [floor_id,hall_type_id,hall_number,id], (err, result) => {
      if (err) return res.json({ Error: "Error when updating in sql" })
      return res.json({ Status: "Success", Result: result })
    })
  })

export default putRoutes;