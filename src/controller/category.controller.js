const { default: mongoose } = require("mongoose");
const Category = require("../model/Category.model");

const createCategory = async (req, res, next) => {
  //validate
  try {
    const category = await Category.create(req.body);
    res.status(200).send("category created");
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const category = await Category.find();
    res.status(200).send(category);
  } catch (err) {
    next(err);
  }
};



const deleteCategory=async(req,res,next)=>{
  try{
const id=new mongoose.Types.ObjectId(req.params.id)
await Category.findOneAndDelete(id)
res.status(200).send("category deleted")

  }catch(err){
    next(err)
  }
  
}

module.exports = {
  getCategories,
  deleteCategory,
  createCategory,
};
