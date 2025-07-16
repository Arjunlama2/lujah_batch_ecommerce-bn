

const mongoose=require("mongoose")



const orderSchema=mongoose.Schema({
    product:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Product"
    },user:{
     type:mongoose.Types.ObjectId,
        ref:"User"

    },
    quantity:{
        type:Number,
        required:true,
        min:1 



    }
 
})


const Order=mongoose.model("Order",orderSchema)


module.exports=Order