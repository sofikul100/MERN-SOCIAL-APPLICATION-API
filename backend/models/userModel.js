const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter your name']
    },
    avatar:{
        public_id:String,
        url:String
    },
    email:{
        type:String,
        required:[true,'Enter your Email'],
        unique:true,
        validate:[validator.isEmail,'Enter valid email']
    },
    password:{
        type:String,
        required:[true,'Enter  Password'],
    },

    posts:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Post'
        }
    ],
    followers:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ],
    following:[
        {
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    ]

})

// //============ hasinng password===========//
// userSchema.pre('save', async function () {
//     if(!this.isModified('password')){
//         next()
//     }

//     this.password = await bcrypt.hash(this.password,10)
// })

// //============ creating jwt token=============//
// userSchema.methods.getJwtToken = function () {
//      return jwt.sign({id:this._id},process.env.JWT_SECRED,{
//         expiresIn:process.env.JWT_EXPIRE
//      })
// }

// //============ compare password ============//


// userSchema.methods.comparePassword = async function (enteredPassword){
//     return bcrypt.compare(enteredPassword,this.password);
// }





module.exports  = mongoose.model("User",userSchema);










//post schema design feilds =========//


//1= name-string-required
//1= avatar-string
//2= email-string-required
//3= password-string-select
//4= posts[{type,ref}]----post
//5= followers[{type,ref}]---user
//6= following[{type,ref}]---user