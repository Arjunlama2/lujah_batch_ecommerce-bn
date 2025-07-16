

const mongoose=require("mongoose")
const Category = require("./Category.model")


const productSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"

    },
    price:{
        type:Number,
      
    },
    description:{
        type:String,
      
        
    },
    brand:{
        type:String
    },
    size:{
        type:[String]

    },color:{
        type:String
    },
    productOf:{
     type:mongoose.Types.ObjectId,
        ref:"User"

    }
 
})


const Product=mongoose.model("Product",productSchema)


module.exports=Product