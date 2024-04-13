import mysql from 'mysql'
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

export default db;