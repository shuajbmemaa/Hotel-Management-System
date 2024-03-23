import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import session from 'express-session';

import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin:["http:localhost:5173"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
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





app.listen(3002,()=>{
    console.log("Server is running ");
})