const jwt = require('jsonwebtoken');
const User = require('../models/userModel');



//====================== STEP 3==================//
var checkUserAuth = async  (req,res,next) =>{
   let token
   const { authorization } = req.headers
   if (authorization && authorization.startsWith('Bearer')) {
     try {
       // Get Token from header
       token = authorization.split(' ')[1]
 
       // Verify Token
       const { userID } = jwt.verify(token, process.env.JWT_SECRED)
 
       // Get User from Token
       req.user = await User.findById(userID).select('-password')
 
       next()
     } catch (error) {
       console.log(error)
       res.status(401).send({ "status": "failed", "message": "Unauthorized User" })
     }
   }
   if (!token) {
     res.status(401).send({ "status": "failed", "message": "Unauthorized User, No Token" })
   }
}

module.exports = checkUserAuth;