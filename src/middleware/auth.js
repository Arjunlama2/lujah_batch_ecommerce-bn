
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv");
const { BUYER, SELLER } = require("../constants");
dotenv.config({quiet:true})
const isAuthenticated = async(req, res, next) => {
  try {
    const token = req.headers?.authorization.split(" ")[1];
   
    if (token) {
        const user=await jwt.verify(token,process.env.JWT_SECRET)
        
        req.user=user
        next()
    } else {
      res.status(401).send("Please Authenticate");
    }
  } catch (err) {
    next(err);
  }
};

const isBuyer=(req,res,next)=>{
    if(req.user.role==BUYER){
        next()
    }else{
        res.status(403).send("Permission required")
    }


}

const isSeller=(req,res,next)=>{
    if(req.user.role==SELLER){
        next()
    }else{
        res.status(403).send("Permission required")
    }


}


module.exports = {
  isAuthenticated,
  isBuyer,
  isSeller
};
