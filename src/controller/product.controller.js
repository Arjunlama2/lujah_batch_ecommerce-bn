const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../model/Porduct.model");
const  mongoose = require("mongoose");
const productSchema = Joi.object({
  title: Joi.string().trim().min(2).max(120).required(),

  category: Joi.string().required(),

  price: Joi.number()
    .positive()
    .precision(2) // up to 2 decimals
    .messages({
      "number.base": "price must be a number",
      "number.positive": "price must be > 0",
    })
    .required(),
  description: Joi.string().trim().max(500).optional(),

  brand: Joi.string().trim().max(60).optional(),

  size: Joi.array()
    .items(Joi.string().trim().max(30))
    .unique() // no duplicate sizes like ["M","M"]
    .optional(),
    
});



const getAllProducts=async(req,res,next)=>{
    try{
        const products=await Product.find().populate("category")
        res.status(200).send(products)
    }catch(err){
        next(err)
    }
}

const getSingleProduct=async(req,res,next)=>{
    try{
        const id=new mongoose.Types.ObjectId(req.params.id)
      const productDetails=await Product.findOne(id)
      res.status(200).send(productDetails)
    }catch(err){
        next(err)
    }
}


const createProduct=async(req,res,next)=>{
    try{
        const {error,value}=productSchema.validate(req.body,{
          allowUnknown:true,
        })
        if(!error){
            const product=await Product.create(value)
            res.status(200).send({
                messages:"product created successfully",
                product
            })
        }else{
          throw new Error(error.details[0])
        }
    }catch(err){
        next(err)
    }
}


const updateProduct=async (req,res,next)=>{
      try{
        const id=new mongoose.Types.ObjectId(req.params.id)
      const {error,value}=productSchema.valid(req.body)
      if(!error){
        const data=Product.findOneAndUpdate(id,value)
        res.status(200).send(data)
      }
      }catch(err){
        next(err)
      }

}


const deleteProduct=async (req,res,next)=>{
      try{
        const id=new mongoose.Types.ObjectId(req.params.id)
      
        await Product.findOneAndDelete(id)
        res.status(200).send("Product Deleted successfully" )
      
      }catch(err){
        next(err)
      }

}





module.exports={
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}