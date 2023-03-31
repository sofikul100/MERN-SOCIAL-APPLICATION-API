const app = require('./app');
const dotenv = require('dotenv');
const connect_with_mongo = require('./config/database.js');


//========== cofig dotenv============//
dotenv.config({path:"backend/config/config.env"});


//=========== call database connection function===============//
connect_with_mongo();





app.listen(process.env.PORT,(req,res,next) =>{
   console.log(`Server is working port on http://localhost:${process.env.PORT}`)
});