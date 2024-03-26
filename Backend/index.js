import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import session from 'express-session';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import mysql from 'mysql'

const app = express();
app.use(cors({
    origin: '*',
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:1000*60*60*24
    }
}))
 
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_"+Date.now() + path.extname(file.originalname))
    }
})

const upload=multer({
    storage:storage
})

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"hms"
})

db.connect(function(err){
    if(err){
        console.log("Gabim gjate lidhjes me databaze SQL");
    }else{
        console.log("SQL Connected");
    }
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = ? and password = ?';
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "An error occurred while logging in" });
      }
      if (result.length > 0) {
        req.session.role = result[0].role;
        //console.log(req.session.name);
        //console.log(result);
        return res.json({ Login: true,userId: result[0].id, name: req.session.name })
      } else {
        res.json({ Login: false });
      }
    });
  });
  
  app.post('/register', (req, res) => {
    const sql = "INSERT INTO users(`name`,`email`,`password`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.password
    ]
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Message: "Error in Node" })
      return res.json(result)
    })
  })
  


app.listen(3002,()=>{
    console.log("Server is running ");
})