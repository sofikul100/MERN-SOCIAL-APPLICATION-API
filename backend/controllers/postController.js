const Post = require("../models/postModel");
const User = require('../models/userModel')

exports.createPost = async (req,res) => {
    try {
        const newPostData = {
            caption: req.body.caption,
            image: {
                public_id: "this is image public id",
                url: "image demo url"
            },
            owner:req.user._id 
        }
        
        const newPost = await Post.create(newPostData);
        const user = await User.findById(req.user._id);
        user.posts.push(newPost._id)
        await user.save();
        return res.status(200).json({
            success: true,
            post: newPost
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        })
    }
}

exports.likeAndUnlikePost = async (req,res,next) =>{
    try{

        const post = await Post.findById(req.params.id);
        
        if(post.likes.includes(req.user._id)){
            
           const index =post.likes.indexOf(req.user._id)
           post.likes.splice(index,1)
           
           await post.save();

           return res.status(400).json({
              success:true,
              message:'Successfully Unlike'
           })
        }else{
            post.likes.push(req.user._id)
            await post.save();
            return res.status(200).json({
                success:true,
                message:'Like Successfully' 
            })
        }
    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

//=========delte post=============//


exports.deletePost = async (req,res) =>{
     try{
         const post = await Post.findById(req.params.id);
         if(!post){
            return res.status(400).json({
                success:false,
                message:"Post Not Found"
            })
         }

        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success:false,
                message:'Unauthorized'
            })
        }

        await post.deleteOne();


        const user = await User.findById(req.user._id);

        const index = user.posts.indexOf(req.params.id);

        user.posts.splice(index,1)

        await user.save();
        return res.status(200).json({
            success:true,
            message:'successfully post deleted'
        })
        
     }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
     }
}

