const mongoose =require('mongoose');



function connect_with_mongo (){
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true})
      .then(() =>{
         console.log(`Successfully Application Connect With MongoDB`)
      })
      .catch((e) =>{
        console.log(e)
      })
}



module.exports = connect_with_mongo;