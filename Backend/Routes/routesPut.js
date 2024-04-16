import express from 'express'
import db from '../DB/db.js'

const putRoutes=express.Router();

putRoutes.put('/updateAmenties/:id',(req,res)=>{
    const id=req.params.id;
    const {name,description}=req.body;
    const sql="Update amenties set name=?,description=? where id = ?" ;
    db.query(sql, [name,description,id], (err, result) => {
      if (err) return res.json({ Error: "Error when updating in sql" })
      return res.json({ Status: "Success", Result: result })
    })
  })

  putRoutes.put('/updateUsers/:id',(req,res)=>{
    const id=req.params.id;
    const {name,email,role,date_of_birth}=req.body;
    const sql="Update users set name=?,email=?,role=?,date_of_birth=? where id = ?" ;
    db.query(sql, [name,email,role,date_of_birth,id], (err, result) => {
      if (err) return res.json({ Error: "Error when updating in sql" })
      return res.json({ Status: "Success", Result: result })
    })
  })

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

export default putRoutes;