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
  origin:["http://localhost:5173"],
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
});






  app.get('/logout', (req, res) => {
    req.session.destroy();
    return res.json("Success");
  })
  
  
  app.post('/register', (req, res) => {
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
});

  
  app.get('/', (req, res) => {
    if (req.session.role) {
      return res.json({ valid: true, role: req.session.role })
    } else {
      return res.json({ valid: false })
    }
  })

 app.get('/getUseret',(req,res)=>{
  const sql = "Select id,name,email,img_url,gender from users";   
  db.query(sql,(err,result)=>{
    if(err) return res.status(400).json({message:"Gabim"})
    return res.status(200).json({Status:"Success",Result:result})
  })
 })

 app.get('/getAmenties',(req,res)=>{
  const sql = "Select id,name,image,description from amenties";   
  db.query(sql,(err,result)=>{
    if(err) return res.status(400).json({message:"Gabim"})
    return res.status(200).json({Status:"Success",Result:result})
  })
 })

 app.get('/getUsers/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "Select name,email,role,date_of_birth from users where id=?";   
  db.query(sql, [id], (err, result)=>{
    if(err) return res.status(400).json({message:"Gabim"})
    return res.status(200).json({Status:"Success",Result:result})
  })
 })

 app.get('/getAmenties/:id',(req,res)=>{
  const id = req.params.id;
  const sql = "Select name,description from amenties where id=?";   
  db.query(sql, [id], (err, result)=>{
    if(err) return res.status(400).json({message:"Gabim"})
    return res.status(200).json({Status:"Success",Result:result})
  })
 })




 app.put('/updateUsers/:id',(req,res)=>{
  const id=req.params.id;
  const {name}=req.body;
  const {email}=req.body;
  const {role}=req.body;
  const {date_of_birth}=req.body;
  const sql="Update users set name=?,email=?,role=?,date_of_birth=? where id = ?" ;
  db.query(sql, [name,email,role,date_of_birth,id], (err, result) => {
    if (err) return res.json({ Error: "Error when updating in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})

app.put('/updateAmenties/:id',(req,res)=>{
  const id=req.params.id;
  const {name}=req.body;
  const {description}=req.body;
  const sql="Update amenties set name=?,description=? where id = ?" ;
  db.query(sql, [name,description,id], (err, result) => {
    if (err) return res.json({ Error: "Error when updating in sql" })
    return res.json({ Status: "Success", Result: result })
  })
})


  app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gabim gjatë fshirjes së përdoruesit" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ Status: "Error", Message: "Pajisja nuk u gjet" });
        }
        return res.status(200).json({ Status: "Success", Message: "Pajisja u fshi me sukses" });
    });
});

app.delete('/deleteAmenties/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM amenties WHERE id = ?";
  db.query(sql, [id], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: "Gabim gjatë fshirjes së përdoruesit" });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ Status: "Error", Message: "Pajisja nuk u gjet" });
      }
      return res.status(200).json({ Status: "Success", Message: "Pajisja u fshi me sukses" });
  });
});

app.post('/krijonjeLlogari',upload.single('image'),(req,res)=>{
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

app.post('/shtonjeAmentie',upload.single('image'),(req,res)=>{
  const sql="Insert into amenties (`name`,`image`,`description`) VALUES (?)"
    const values=[
      req.body.name,
      req.file.filename,
      req.body.description
    ]
    db.query(sql,[values],(err,result)=>{
      if (err) return res.json({ Error: "Gabim gjate insertimit te produkteve ne databaze" })
    return res.json({ Status: "Success" })
    })
})


app.listen(3002,()=>{
    console.log("Server is running ");
})