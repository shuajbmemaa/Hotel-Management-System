import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
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





app.listen(3002,()=>{
    console.log("Server is running ");
})