import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import postRoutes from './Routes/routesPost.js';
import getRoutes from './Routes/routesGet.js';
import deleteRoutes from './Routes/routesDelete.js';
import putRoutes from './Routes/routesPut.js';


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

 
app.use('/',postRoutes);
app.use('/',getRoutes);
app.use('/',deleteRoutes);
app.use('/',putRoutes);

app.listen(3002,()=>{
    console.log("Server is running ");
})