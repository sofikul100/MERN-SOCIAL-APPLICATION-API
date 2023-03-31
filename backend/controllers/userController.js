const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/postModel')


//============ step 1=============//
exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body
  const user = await User.findOne({ email: email })
  if (user) {
    res.send({ "status": "failed", "message": "Email already exists" })
  } else {
    if (name && email && password) {
      try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const doc = new User({
          name: name,
          email: email,
          password: hashPassword,
        })
        await doc.save()
        const saved_user = await User.findOne({ email: email })
        // Generate JWT Token
        const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRED, { expiresIn: '5d' })
        res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
      } catch (error) {
        console.log(error)
        res.send({ "status": "failed", "message": "Unable to Register" })
      }
    } else {
      res.send({ "status": "failed", "message": "All fields are required" })
    }
  }
}



//================= step 2===================//
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password)
        if ((user.email === email) && isMatch) {
          // Generate JWT Token
          const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRED, { expiresIn: '5d' })
          res.send({ "status": "success", "message": "Login Success", "token": token })
        } else {
          res.send({ "status": "failed", "message": "Email or Password is not Valid" })
        }
      } else {
        res.send({ "status": "failed", "message": "You are not a Registered User" })
      }
    } else {
      res.send({ "status": "failed", "message": "All Fields are Required" })
    }
  } catch (error) {
    console.log(error)
    res.send({ "status": "failed", "message": "Unable to Login" })
  }
}




exports.loggedUser = async (req, res, next) => {
  res.send({ "user": req.user })
}


exports.changePassword = async (req, res, next) => {
  try {
    const { password, password_confirmation } = req.body;

    if (!password && !password_confirmation) {
      return res.status(400).json({
        success: false,
        message: 'Enter password and password confirmation'
      })
    }

    if (password !== password_confirmation) {
      return res.status(400).json({
        success: false,
        message: 'password and password confirmation Doesnot match'
      })
    }

    const salt = await bcrypt.genSalt(10);
    const newhashPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(req.user._id, { $set: { password: newhashPassword } });
    return res.status(200).json({
      success: true,
      message: 'Password Change Successfully'
    })

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (loggedInUser.following.includes(userToFollow._id)) {
      const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
      const indexFollowers = userToFollow.followers.indexOf(loggedInUser._id);

      loggedInUser.following.splice(indexFollowing, 1);
      userToFollow.followers.splice(indexFollowers, 1);

      await loggedInUser.save();
      await userToFollow.save();

      return res.status(200).json({
        success:true,
        message:'Successfully Unfollow'
      })
    } else {
      loggedInUser.following.push(userToFollow._id)
      userToFollow.followers.push(loggedInUser._id)


      await loggedInUser.save();
      await  userToFollow.save();

      return res.status(200).json({
        success:true,
        message:'Successfully Follow'
      })
    }



  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}



exports.getPostOfFollowing = async (req,res,next) =>{
  try{

      //============== first way to do this==========//
      const posts = await User.findById(req.user._id).populate(
        "following",
        "posts"
      );
      
      //==== second way to do this=============//
      // const posts = await Post.find({
      //    owner:{
      //       $in:user.following
      //    }
      // })
      return res.status(400).json({
        success: true,
        posts
      })
  }catch(error){
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
}