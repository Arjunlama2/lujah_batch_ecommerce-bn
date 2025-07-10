

const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            // validator
        }
    },
    password:{
        type:String,
        required:true
        
    },
    phone:{
        type:String
    },
    role:{
        type:String,
        enum:["buyer","Seller"],
        default:"buyer"
    }
})


const User=mongoose.model("User",userSchema)


module.exports=User