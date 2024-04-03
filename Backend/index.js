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
    const { userOrEmail, password } = req.body;
    const sql = "SELECT * FROM users WHERE (name = ? OR email = ?) AND password=? ";
    
    db.query(sql, [userOrEmail, userOrEmail, password], (err, result) => { 
      if (err) {
        console.log(err);
        return res.json({ Error: "An error occurred while logging in" });
      }
      if (result.length > 0) {
        req.session.role = result[0].role;
        const accessToken = jwt.sign({ id: result[0].id, email: result[0].email }, 'secretKey', { expiresIn: '1h' })
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


app.listen(3002,()=>{
    console.log("Server is running ");
})