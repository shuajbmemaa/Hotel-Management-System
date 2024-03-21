import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors({
    origin:["http:localhost:5173"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}));
app.use(express.json());
app.use(express.static('public'));




app.listen(3002,()=>{
    console.log("Server is running ");
})