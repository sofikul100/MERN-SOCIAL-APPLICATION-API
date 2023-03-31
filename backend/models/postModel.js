const mongoose =require('mongoose');



const postSchema = new mongoose.Schema({
      caption:{
        type:String,
        required:[true,'Please enter post caption']
      },
      image:{
        public_id:String,
        url:String
      },
      owner:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        //it will be required true
      },
      createdAt:{
        type:Date,
        default:Date.now
      },
      likes:[
        {
            type:mongoose.Types.ObjectId,
            ref:'User'
        }
      ],
      comments:[
        {
            user:{
                type:mongoose.Types.ObjectId,
                ref:"User"
            },
            comment:{
                type:String,
                required:true
            }
        }
      ]

})

module.exports= mongoose.model('Post',postSchema);
















//==========post schema design feilds ===========//
//1=caption-string,
//2= image-string
//3= owner- objectType
//4=  createdAt - date
//5= likes[{type,ref}]
//6= comments[{user,comment-required}]
















