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
    const sql = "Select id,name,email,img_url,gender from users";   
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
    const sql = "Select name,email,role,date_of_birth from users where id=?";   
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
  

export default getRoutes;

