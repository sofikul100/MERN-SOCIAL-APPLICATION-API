const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const app = express();

//----------- import all middlewares-------//

//=========== use cors and json===========//
app.use(cors());
app.use(express.json())
//=========== use cookie parser and body parser============//
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


// ---------- import all routes--------//
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute')

//--------- all routes will be here------//
app.use('/api/v1',postRoute)
app.use('/api/v1',userRoute)

//--------- all middlewares will be here-------//




module.exports = app;