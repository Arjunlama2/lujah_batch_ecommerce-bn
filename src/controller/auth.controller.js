const Joi = require("joi");
const User = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } }) // skip strict TLD check
    .required(),

  password: Joi.string().min(8).max(128).required(),

  phone: Joi.string()
    .pattern(/^\+?\d{7,14}$/)
    .allow("", null),

  role: Joi.string().valid("buyer", "seller").default("buyer"),
});
const LoginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } }) // skip strict TLD check
    .required(),

  password: Joi.string().min(8).max(128).required(),
});

const signup = async (req, res, next) => {
  try {
    const userData = req.body;

    const { error, value } = UserSchema.validate(userData, {});
    if (!error) {
     
      const hashedPassword = await bcrypt.hash(value.password, 10);
      value.password = hashedPassword;
      const user = await User.create(value);
      res.status(200).send({ message: "User Created successfully" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const loginData = req.body;
    const { error, value } = LoginSchema.validate(loginData);

    if (!error) {
      const user = await User.findOne({ email: value.email });
      if (user) {
        const isMatch = await bcrypt.compare(value.password, user.password);

        if (isMatch) {
          const userObject = user.toObject();
          delete userObject.password;
          const token = await jwt.sign(userObject, process.env.JWT_SECRET);
          res.status(200).send({token});
        } else {
          res.status(401).send({ message: "wrong credentials" });
        }
      } else {
        res.status(401).send({ message: "wrong credential" });
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  signup,
  login
};
