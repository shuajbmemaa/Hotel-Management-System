import express from 'express'
import db from '../DB/db.js'
import jwt from 'jsonwebtoken'
import path from 'path';
import multer from 'multer';


const postRoutes=express.Router();

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

postRoutes.post('/login', (req, res) => {
    const { userOrEmail, password } = req.body;
    const sql = "SELECT * FROM users WHERE (name = ? OR email = ?) AND password=? ";
    
    db.query(sql, [userOrEmail, userOrEmail, password], (err, result) => { 
      if (err) {
        console.log(err);
        return res.json({ Error: "An error occurred while logging in" });
      }
      if (result.length > 0) {
        req.session.role = result[0].role;
        const accessToken = jwt.sign({ id: result[0].id, role: result[0].role }, 'secretKey', { expiresIn: '1h' })
        const refreshToken = jwt.sign({ email: result[0].email }, 'refreshSecretKey')
        return res.json({ Login: true, userId: result[0].id, accessToken, refreshToken })
      } else {
        return res.json({ Login: false });
      }
    });
})

postRoutes.post('/register', (req, res) => {
    const { name, email, password, role } = req.body;
    const checkEmail = "SELECT * FROM users WHERE email = ?";
    
    db.query(checkEmail, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error" });
        }
        if (result.length > 0) {
            return res.status(400).json({ message: "Email-i eshte ne perdorim" });
        } else {
            const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
            db.query(sql, [name, email, password, role], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Gabim ne server" });
                }
                return res.status(201).json({ message: "Regjistrimi u krye me sukses" });
            });
        }
    });
})

postRoutes.post('/krijonjeLlogari',upload.single('image'),(req,res)=>{
    const sql="Insert into users (`name`,`email`,`password`,`role`,`img_url`,`gender`,`date_of_birth`) VALUES (?)"
      const values=[
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.role,
        req.file.filename,
        req.body.gender,
        req.body.date_of_birth
      ]
      db.query(sql,[values],(err,result)=>{
        if (err) return res.json({ Error: "Gabim gjate insertimit te produkteve ne databaze" })
      return res.json({ Status: "Success" })
      })
  })

  postRoutes.post('/shtonjeAmentie',upload.single('image'),(req,res)=>{
    const sql="Insert into amenties (`name`,`image`,`description`) VALUES (?)"
      const values=[
        req.body.name,
        req.file.filename,
        req.body.description
      ]
      db.query(sql,[values],(err,result)=>{
        if (err) return res.json({ Error: "Gabim gjate insertimit te produkteve ne databaze" })
      return res.json({ Status: "Success", result:req.body })
      })
  })

  postRoutes.post('/insertHallTypes',upload.single('image'),(req,res)=>{
    const sql="Insert into hall_type (`title`,`short_code`,`baseOccupancy`,`higherOccupancy`,`amenties_id`,`basePrice`,`image`) VALUES (?)";
    const values=[
      req.body.title,
      req.body.short_code,
      req.body.baseOccupancy,
      req.body.higherOccupancy,
      req.body.amenties_id,
      req.body.basePrice,
      req.file.filename
    ]
    db.query(sql,[values],(err,result)=>{
      if (err) return res.json(err)
      return res.json({Status:"Success"})
    })
  })

  postRoutes.post('/shtonjeFloor',(req,res)=>{
    const sql="Insert into floors (`name`,`floor_number`,`description`) VALUES (?)"
      const values=[
        req.body.name,
        req.body.floor_number,
        req.body.description
      ]
      db.query(sql,[values],(err,result)=>{
        if (err) return res.json({ Error: "Gabim gjate insertimit te floors ne databaze" })
      return res.json({ Status: "Success" })
      })
  })
  

export default postRoutes;