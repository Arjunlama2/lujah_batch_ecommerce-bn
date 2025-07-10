

const express=require("express")

const router=express.Router()

const { Router } = require("express")
const userRouter=require("./user.router")

const productRouter=require("./product.router")


const routers=[
    {
        path:"/user",
        Router:userRouter
    },
       {
        path:"/product",
        Router:productRouter
    },
   
]


routers.map((el)=>{
router.use(el.path,el.Router)
})





module.exports=router