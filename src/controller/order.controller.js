const Joi = require("joi");
const Order = require("../model/Order.model");
const mongoose = require("mongoose");
const Product = require("../model/Porduct.model");

const createOrderSchema = Joi.object({
  product: Joi.string().required(),

  qunatity: Joi.number().required(),

  user: Joi.string().required(),
});




const createOrder=async(req,res,next)=>{
    try{

        const userid=new mongoose.Types.ObjectId(req.user._id)
        req.body.user=userid
        const {error,value}=createOrderSchema.validate(req.body)
        const order=await Order.create(value)
        res.status(200).send("Order success")
    }catch(err){
        next (err)
    }
}



const getOwnOrder = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const role = req.user.role;

    let orders;

    if (role === "buyer") {
      orders = await Order.find({ user: userId })
        .populate("product")
        .exec();
    } else if (role === "seller") {
      const sellerProducts = await Product.find({ productOf: userId }).select("_id");
      const productIds = sellerProducts.map(p => p._id);
      orders = await Order.find({ product: { $in: productIds } })
        .populate("product")
        .populate("user") 
        .exec();
    } else {
      return res.status(403).json({ message: "Invalid role" });
    }

    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

module.exports ={

    getOwnOrder,
    createOrder,

}







module.exports={
createOrder,
getOwnOrder
}